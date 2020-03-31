import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  authenticate() {
    const body = {
      username: "admin",
      password: "admin"
    };

    this.authService.authenticate(body)
    .subscribe(response => {
      console.log('authenticate ', response);
    localStorage.setItem('credentials', response);
    });
  }

  getUsers() {
    this.authService.getUsers()
    .subscribe(response => {
      console.log('authenticate ', response);
    });

  }
}