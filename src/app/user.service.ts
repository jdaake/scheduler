import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
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

  }

}
