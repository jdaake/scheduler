import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  // Get all events
  getAll() {
    return this.http.get(`api/events/all`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // Get events by event id
  getById(id: number) {
    return this.http.get(`api/events/byid/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // Get events by userId
  getByUserId(id: number) {
    return this.http.get(`api/events/byUser/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // Get event by user calendarId
  getByCalendarId(id: number) {
    return this.http.get(`api/events/byCalendarId/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // delete event
  deleteEvent(id: number) {
    return this.http.delete(`api/events/delete/${id}`).pipe(
      map(res => res['success']),
      catchError(err => {
        console.log(err);
        return of({
          err: err
        });
      })
    );
  }

  // edit event
  updateEvent(name: string, description: string, date: Date, duration: number, id: number) {
    return this.http.post(`api/events/update/${id}`,
      {
        'name': name,
        'description': description,
        'date': date,
        'duration': duration,
      }).pipe(
        map(res => res['success']),
        catchError(err => {
          console.log(err);
          return of({
            err: err
          });
        })
      );
  }

  // add event
  addEvent(name: string, description: string, date: Date, duration: number, calId: number) {
    return this.http.post('api/events/add',
      {
        'name': name,
        'description': description,
        'date': date,
        'duration': duration,
        'calendarId': calId
      }).pipe(
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


