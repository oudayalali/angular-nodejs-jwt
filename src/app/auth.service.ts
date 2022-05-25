import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loginUrl = 'https://nodejs-api-jwt.herokuapp.com/api/login';
  private _postUrl = 'https://nodejs-api-jwt.herokuapp.com/api/posts';
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  // posts
  userPosts(): Observable<any> {
    return this.http.get(this._postUrl, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      })
    );
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
}
