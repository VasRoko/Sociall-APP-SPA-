import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginMode = false;

  constructor() { }

  ngOnInit() {}

  hideRegister(RegisterMode: boolean) {
    this.loginMode = RegisterMode;
  }

  hideLogin(LoginMode: boolean) {
    this.loginMode = !LoginMode;
  }

}
