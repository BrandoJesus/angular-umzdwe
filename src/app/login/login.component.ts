import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService, UserModel } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;
  users: any;
  errorUser = '';
  user: any = {};
  userjson: any;

  constructor(
    private authService: AuthService, private userService: UserService
  ) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
    this.user = {
      username: "repuestock",
      email: "repuestock@correo.com",
      password: "123456",
      password2: "123456",
      firstName: "repuestock",
      lastName: "repuestock",
      cellphone: "978745454"
    };
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
    this.userService.getUsers().subscribe(response => {
      console.log('authenticate ', response);
      this.users = response.body;
      this.errorUser = '';
    }, error => {
      this.errorUser = error;
    });

  }

  newUser() {
    const user: any = this.user;
    this.users = [];

    this.userService.newUser(user).subscribe(response => {
      console.log('newUser ', response);
      this.errorUser = '';
      this.userjson = response.body;
    }, error => {
      this.errorUser = error;
      this.userjson = '';
    });
  }

  updateUser() {
    const user: any = this.user;
    this.users = [];

    this.userService.updateUser(user, user.username).subscribe(response => {
      console.log('updateUser ', response);
      this.errorUser = '';
      this.userjson = response.body;
    }, error => {
      this.errorUser = error;
      this.userjson = '';
    });
  }
  
  deleteUser() {
    const user: any = this.user;
    this.users = [];

    this.userService.deleteUser(user).subscribe(response => {
      console.log('deleteUser ', response);
      this.errorUser = '';
      this.userjson = 'usuario eliminado';
    }, error => {
      this.errorUser = error;
      this.userjson = '';
    });
  }
}