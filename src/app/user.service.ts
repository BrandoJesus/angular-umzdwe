import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { environment } from '../environment';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  // RUTA API
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOptions() {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const _credentials = JSON.parse(savedCredentials);
      console.log(`Authorization: Bearer ${_credentials.token}`);

      const options: any = {
        headers : {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${_credentials.token}`
        },
        observe: 'response' as 'body'
      };

      return options;
    } else {
      const options: any = {
        observe: 'response' as 'body'
      };
      return options;
    }
  }

  getUsers() : Observable<any> {
    const options = this.getOptions();
    return this.http.get(`${this.baseUrl}/v1/contacts/users`, options);

  }
  
  newUser(context: any): Observable<any> {
    const options = this.getOptions();
    return this.http.post(`${environment.baseUrl}/v1/contacts/users`, context, options);
  }

  updateUser(user: UserModel, username?: string): Observable<any> {
    const options = this.getOptions();
    const currentUsername = username ? username : this.authService.username;
    return this.http.put(`${environment.baseUrl}/v1/contacts/users/${currentUsername}`, user, options);
  }

  deleteUser(user: UserModel): Observable<any> {
    const options = this.getOptions();
    return this.http.delete(`${environment.baseUrl}/v1/contacts/users/${user.username}`, options);
  }
}

export interface UserModel {
  active: boolean;
  cellphone: string;
  email: string;
  employee: any;
  typeEmployee: string;
  fullName: string;
  firstName: string;
  lastName: string;
  roles: any[];
  rol: string;
  username: string;
}