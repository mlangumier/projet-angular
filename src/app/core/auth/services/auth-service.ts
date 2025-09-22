import { HttpClient } from "@angular/common/http";
import { afterNextRender, computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from "rxjs";
import { ICredentials, IRegister, IUserAuth } from "../auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly _currentUser = signal<IUserAuth | null>(null);
  currentUser = this._currentUser.asReadonly();
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    afterNextRender({
      write: () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          this._currentUser.set(JSON.parse(storedUser));
        }
      }
    })
  }

  checkIsEmailAvailable(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/user/available/${ email }`);
  }

  register(payload: IRegister): Observable<IUserAuth> {
    return this.http.post<IUserAuth>(`/user`, payload).pipe(tap((response: IUserAuth) => this.setUserAuth(response)));
  }

  login(credentials: ICredentials): Observable<IUserAuth> {
    const btoaCredentials = `${ credentials.email }:${ credentials.password }`

    return this.http.get<IUserAuth>(`/account`, {
      headers: {
        "Authorization": `Basic ${ btoa(btoaCredentials) }`,
      },
      withCredentials: true
    }).pipe(tap((response: IUserAuth) => this.setUserAuth(response)))
  }

  logout() {
    return this.http.get<any>(`/logout`).pipe(tap((response) => {
      this._currentUser.set(null);
      localStorage.removeItem("user");
    }));
  }

  // Helper method that sets the authenticated user in the app's state & local storage
  private setUserAuth(user: IUserAuth): void {
    localStorage.setItem("user", JSON.stringify(user));
    this._currentUser.set(user);
  }
}
