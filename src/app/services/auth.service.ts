import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest } from '../models/IAuth.inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7257/api/user/login';
  constructor(private _http: HttpClient) {}

  login(loginInfo: ILoginRequest) {
    return this._http.post(this.apiUrl, loginInfo);
  }
}
