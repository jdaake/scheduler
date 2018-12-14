import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private router: Router) { }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
    location.href = 'calendar';
  }


  logout() {
    this.loggedIn = false;
    console.log('Logged Out');
    this.router.navigate(['home']);
  }
}
