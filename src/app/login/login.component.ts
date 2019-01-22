import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() hideLogin = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyjsService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully');
      }, error => {
        if (error === 401) {
          this.alertify.error('The username or password you entered is incorrect');
        } else {
          this.alertify.error(error);
        }
      }, () => {
        this.router.navigate(['/members']);
      });
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  hideComponent() {
    this.hideLogin.emit(true);
  }

}
