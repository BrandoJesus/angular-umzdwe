import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;
  users: any;

  constructor(
    private authService: AuthService, private userService: UserService
  ) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

  authenticate() {
    const user = {
      username: "admin",
      password: "admin"
    };

    this.authService.authenticate(user)
    .subscribe(credentials => {
      console.log('authenticate ', credentials);
      const data = {
        username: user.username,
        token: credentials.id_token
      };
      this.authService.setCredentials(data);
      this.isLogged = this.authService.isAuthenticated();
    });
  }

  logout() {
    this.authService.logout()
    .subscribe(response => 
    this.isLogged = this.authService.isAuthenticated());
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(response => {
      console.log('authenticate ', response);
      this.users = response.body;
    });

  }
  newUser() {

  }
  
}