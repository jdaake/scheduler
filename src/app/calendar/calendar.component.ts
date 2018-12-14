import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Calendars } from '../models/calendars.model';
import { Events } from '../models/events.model';
import { UserService } from '../user.service';
import { EventService } from '../event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('bounceIn', [transition('* <=> *', useAnimation(bounceIn, {
      params: { timing: 3, delay: 0 }
    }))]),
  ]
})

export class CalendarComponent implements OnInit {

  // new calendar form
  calendarForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // new event form group
  eventForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'date': new FormControl('', [Validators.required]),
    'duration': new FormControl('', [Validators.required]),
  });

  //  variables
  calendars: Calendars[] = [];
  events: Events[] = [];
  user;
  error: Object = {};
  newName: string;
  newDescription: string;

  constructor(
    private calendarService: CalendarService,
    private userService: UserService,
    private eventService: EventService) {
    this.user = this.userService.user;
  }

  // Get Calendars by userId
  getCalendarsByUserId(id: number) {
    this.calendarService.getByUserId(id).subscribe(
      res => {
        if (res['err']) {
          console.log(res);
          this.error['err'] = res['err'].error.err;
        } else {
          this.calendars = res;
        }
      });
  }

  // Add new calendar
  addCalendar() {
    this.error = {};
    if (this.calendarForm.valid) {
      this.calendarService.addCalendar(this.calendarForm.value.name, this.calendarForm.value.description, this.user['id']).subscribe(
        res => {
          if (res['err']) {
            this.error['err'] = res['err'].error.err;
            console.log(this.error);
          } else {
            this.getCalendarsByUserId(this.user['id']);
            this.calendarForm.reset('');
          }
        });
    }
  }

  // Delete calendar by index
  deleteCal(idx) {
    this.error = {};
    // pass the calendar index through the click and then call the interface array and use dot notation to get the id
    this.calendarService.deleteCalendar(this.calendars[idx].id).subscribe(
      res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
          console.log(this.error);
        } else {
          this.getCalendarsByUserId(this.user['id']);
        }
      });
  }

  // Edit calendar
  editCal() {
    this.error = {};
    if (this.calendarForm.valid) {
      this.calendarService.updateCalendar(this.calendarForm.value.name, this.calendarForm.value.description).subscribe(
        res => {
          if (res['err']) {
            this.error['err'] = res['err'].error.err;
            console.log(this.error);
          } else {
            this.getCalendarsByUserId(this.user['id']);
          }
        });
    }
  }

  //
  //
  //
  // Event functions
  //
  //
  //

  // Get all events for logged in user
  getEventsByUserId(id) {
    this.eventService.getByUserId(this.user[id]);
  }

  // get the events for a specific calendar
  getEventsByCalId(idx) {
    this.eventService.getByCalendarId(this.calendars[idx].id).subscribe(
      res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
        } else {
          this.events = res;
        }
      });
  }

  // Add new event by passing Calendar index
  addEvent(idx) {
    this.error = {};
    if (this.eventForm.invalid) {
      console.log('All fields are required');
    } else {
      this.eventService.addEvent(this.eventForm.value.name,
        this.eventForm.value.description,
        this.eventForm.value.date,
        this.eventForm.value.duration,
        this.calendars[idx].id).subscribe(
          res => {
            if (res['err']) {
              this.error['err'] = res['err'].error.err;
              console.log(this.error);
            } else {
              // pass calendar index back to get the updated array
              this.getEventsByCalId(idx);
              this.eventForm.reset('');
            }
          });
    }
  }

  // delete event by passing event index and calendarId
  deleteEvent(eventIdx, calId) {
    this.error = {};
    // pass the index through the click and then call the interface array and use dot notation to get the id
    this.eventService.deleteEvent(this.events[eventIdx].id).subscribe(
      res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
          console.log(this.error);
        } else {
          // pass calId to get update array
          this.getUpdatedEvents(calId);
        }
      });
  }

  // get events by calId
  getUpdatedEvents(id) {
    this.eventService.getByCalendarId(id).subscribe(
      res => {
        if (res['err']) {
          console.log(res);
          this.error['err'] = res['err'].error.err;
        } else {
          this.events = res;
        }
      });
  }


  ngOnInit() {
    this.getCalendarsByUserId(this.user['id']);
    this.getEventsByUserId(this.user['id']);
  }

}


