import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

const credentialsKey = 'credentials';

@Injectable()
export class AuthService {

  // RUTA API
  baseUrl = 'https://rstk-back.atl.jelastic.vps-host.net/';
  
  //VARIABLES
  authenticationState = new BehaviorSubject(null);
  private _credentials: Credentials | null;

  constructor(private http: HttpClient) { }

  authenticate(context: LoginContext) : Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/authenticate`, context);
  }

  logout(): Observable<boolean> {
    this.setCredentials();
    return of(true);
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

  getUsers() : Observable<any> {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const _credentials = JSON.parse(savedCredentials);
      console.log(`Authorization: Bearer ${_credentials.token}`);

      const options: any = {
        headers : {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${_credentials.token}`
        }
      };

      return this.http.get(`${this.baseUrl}/v1/contacts/users`,options);
    }

  }

  get credentials(): Credentials | null {
    return this._credentials;
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
