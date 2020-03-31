import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, LoginComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [AuthService, UserService]
})
export class AppModule { }
