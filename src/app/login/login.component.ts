import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: Object = {};

  loginForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  constructor(private userService: UserService, private router: Router) { }

  get user() {
    return this.loginForm.get('username');
  }

  get pass() {
    return this.loginForm.get('password');
  }

  login() {
    this.error = {};
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
        } else {
          this.router.navigate(['/calendar']);
        }
      }
      );
    } else {
      this.error['err'] = 'Invalid password or username';
    }
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
  }

}
