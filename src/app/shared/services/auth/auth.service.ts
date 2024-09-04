import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Enviroment } from '../../../base/Enviroment';
import { code, email, LoginData, repassword } from '../../interfaces/data';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  countcart!:BehaviorSubject<number>;
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  userdata:any;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
      if (typeof localStorage != 'undefined') {
        this.countcart=new BehaviorSubject(Number(localStorage.getItem('cartcount')));
      if (localStorage.getItem('userToken')) {
        this.decodeUserData();
        // _Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }
  signUp(data: Data): Observable<any> {
    return this._HttpClient.post<any>(
      `${Enviroment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  forgetPassword(data:email):Observable<any>
  {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  verifyResetCode(data:code):Observable<any>
  {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  signin(data: LoginData): Observable<any> {
    return this._HttpClient.post<any>(
      `${Enviroment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  resetNewPassword(data:repassword):Observable<any>
  {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
 
  decodeUserData() {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    this.userdata=decoded
    console.log('Hello');
    console.log(this.userData.getValue);
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/Login']);
  }
}
