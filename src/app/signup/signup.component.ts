import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  error: Object = {};


  signupForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    'verifyPass': new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private userService: UserService, private router: Router) { }

  get user() {
    return this.signupForm.get('username');
  }
  get pass() {
    return this.signupForm.get('password');
  }
  get verifyPass() {
    return this.signupForm.get('verifyPass');
  }


  signup(username: string, password: string) {
    this.error = {};
    if (this.signupForm.value.password !== this.signupForm.value.verifyPass) {
      // create UI for this
      console.log('Passwords do not match');
      // create UI for this
    }
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.verifyPass) {
      this.userService.signup(this.signupForm.value.username, this.signupForm.value.password).subscribe(res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
        } else {
          this.router.navigate(['/login']);
        }
      });
    }
  }


  ngOnInit() { }

}
