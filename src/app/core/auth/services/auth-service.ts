import { HttpClient } from "@angular/common/http";
import { afterNextRender, computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from "rxjs";
import { IRegister, IUser } from "../user.model";

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
    return this.http.post<IUser>(`/user`, payload).pipe(tap(user => {
      localStorage.setItem("user", JSON.stringify(user));
      this._currentUser.set(user);
    }));
  }

  // login

  // logout
}
