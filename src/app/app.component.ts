import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  loginMode = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const registered = localStorage.getItem('registered');

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (registered) {
      this.loginMode = true;
    }
  }

  hideRegister(RegisterMode: boolean) {
    this.loginMode = RegisterMode;
  }

  hideLogin(LoginMode: boolean) {
    this.loginMode = !LoginMode;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
