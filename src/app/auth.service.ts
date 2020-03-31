import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { environment } from '../environment';
import * as decode from 'jwt-decode';

const credentialsKey = 'credentials';

@Injectable()
export class AuthService {

  // RUTA API
  baseUrl = environment.baseUrl;
  
  //VARIABLES
  authenticationState = new BehaviorSubject(null);
  private _credentials: Credentials | null;

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  authenticate(context: LoginContext) : Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/authenticate`, context);
  }

  logout(): Observable<boolean> {
    this.setCredentials();
    return of(true);
  }

  isAuthenticated() {
    return !!this.credentials;
  }

  checkAuth() {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this.authenticationState.next(true);
      // console.log('this._credentials', this._credentials);
    } else {
      this.authenticationState.next(false);
    }
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  get username() {
    const token = this.credentials.token;
    return decode(token)['sub'];
  }

  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
      this.authenticationState.next(true);
    } else {
      localStorage.clear();
      // localStorage.removeItem(credentialsKey);
      this.authenticationState.next(false);
    }
  }
}

// MODELOS
export interface LoginContext {
  username: string;
  password: string;
}

export interface Credentials {
  username: string;
  token: string;
}
