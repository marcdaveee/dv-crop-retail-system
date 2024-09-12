import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse } from '../models/IAuth.inteface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../models/IUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7257/api/account';

  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>;

  constructor(private _http: HttpClient) {
    const jsonUser = localStorage.getItem('loginUser');

    if (jsonUser) {
      this.currentUserSubject = new BehaviorSubject<IUser | null>(
        JSON.parse(jsonUser)
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<IUser | null>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  login(loginReq: ILoginRequest) {
    return this._http
      .post<ILoginResponse>(`${this.apiUrl}/login`, loginReq)
      .pipe(
        map((user) => {
          // store user details and JWT Token in local storage so it keeps user logged in
          localStorage.setItem('loginUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove current user in the local storage to log out user
    // return this._http.post(`${this.apiUrl}/logout`, null).pipe(
    //   map((res) => {
    //     console.log('logout');
    localStorage.removeItem('loginUser');
    this.currentUserSubject.next(null);
    //   })
    // );
  }
}
