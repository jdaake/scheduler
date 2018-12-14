import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  constructor(private http: HttpClient) { }


  // Get all calendars
  getAll() {
    return this.http.get(`api/calendar/all`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // Get calendar by calendar id
  getById(id) {
    return this.http.get(`api/calendar/byid/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }
  // Get calendar by user id
  getByUserId(id: number) {
    return this.http.get(`api/calendar/byUser/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // delete calendar
  deleteCalendar(id: number) {
    return this.http.delete(`api/calendar/delete/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // edit calendar
  updateCalendar(name: string, description: string) {
    return this.http.post(`api/calendar/update`, { 'name': name, 'description': description }).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // add calendar
  addCalendar(name: string, description: string, userId: number) {
    return this.http.post(`api/calendar/add`, { 'name': name, 'description': description, 'userId': userId }).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

}
