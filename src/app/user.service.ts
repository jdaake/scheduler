import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: BehaviorSubject<boolean>;
  loggedInStatus: boolean;


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    if (this.user === null) {
      console.log(this.user);
      this.loggedInStatus = false;
    }
    this.loggedIn = new BehaviorSubject<boolean>(this.loggedInStatus);
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signup(username: string, password: string) {
    return this.http.post('/api/users/signup', { 'username': username, 'password': password }).pipe(
      map(res => {
        if (res['success']) {
          localStorage.setItem('user', JSON.stringify({ username: res['success'].username, id: res['success'].id }));
        }
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of({ err: err });
      })
    );
  }

  login(username: string, password: string) {
    return this.http.post('api/users/login', { 'username': username, 'password': password }).pipe(
      map(res => {
        if (res['success']) {
          localStorage.setItem('user', JSON.stringify({ username: res['success'].username, id: res['success'].id }));
          this.loggedIn.next(true);
        }
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of({ err: err });
      })
    );
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
