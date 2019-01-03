import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Output() hideRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyjsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-green'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['',  [Validators.required, Validators.email]],
      gender: ['male'],
      username: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      confirmPassword: ['', Validators.required]
    },  { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true };
  }

  register() {

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    console.log(this.registerForm.value);
  }

  hideComponent() {
    this.hideRegister.emit(true);
  }

}
