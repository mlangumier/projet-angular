import { HttpClient } from "@angular/common/http";
import { afterNextRender, computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from "rxjs";
import { ICredentials, IRegister, IUser } from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly _currentUser = signal<IUser | null>(null);
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => this.currentUser !== null);

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

  register(payload: IRegister): Observable<IUser> {
    return this.http.post<IUser>(`/user`, payload).pipe(tap((response: IUser) => {
      localStorage.setItem("user", JSON.stringify(response));
      this._currentUser.set(response);
    }));
  }

  login(credentials: ICredentials): Observable<IUser> {
    const btoaCredentials = `${ credentials.email }:${ credentials.password }`
    return this.http.get<IUser>(`/account`, {
      headers: {
        "Authorization": `Basic ${ btoa(btoaCredentials) }`
      },
      withCredentials: true
    }).pipe(tap((response: IUser) => {
      localStorage.setItem("user", JSON.stringify(response));
      this._currentUser.set(response);
    }))
  }

  // logout
}
