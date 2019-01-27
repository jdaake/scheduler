import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Calendars } from '../models/calendars.model';
import { Events } from '../models/events.model';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, useAnimation, } from '@angular/animations';
import { bounceIn, flipInY, fadeIn } from 'ng-animate';
import { listStateTrigger, slideDownTrigger } from './animations';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    // transitions animations
    trigger('bounceIn', [transition('* <=> *', useAnimation(bounceIn, {
      params: { timing: 2, delay: 0 }
    }))]),
    trigger('flipInY', [transition('* <=> *', useAnimation(flipInY, {
      params: { timing: 1.5, delay: 0 }
    }))]),
    trigger('fadeIn', [transition('* <=> *', useAnimation(fadeIn, {
      params: { timing: 1.5, delay: 0 }
    }))]),
    listStateTrigger,
    slideDownTrigger
  ]
})

export class CalendarComponent implements OnInit {
  //  variables
  calendars: Calendars[] = [];
  events: Events[] = [];
  user: {};
  error: Object = {};
  eventClicked: boolean;
  hasEvents: boolean;
  calId: number;
  editCalendar = false;

  // new calendar form
  calendarForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  constructor(
    private calendarService: CalendarService,
    private userService: UserService,
    private eventService: EventService,
    private router: Router) {
    this.user = this.userService.user;
  }

  goToEvents(idx, calName) {
    this.calendarService.calId = this.calendars[idx].id;
    this.calendarService.calName = calName;
    this.router.navigate(['/events']);
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

  updateCal(idx: number) {
    this.calId = this.calendars[idx].id;
    this.editCalendar = true;
  }

  // Edit calendar
  editCal() {
    this.error = {};
    if (this.calendarForm.valid) {
      this.calendarService.updateCalendar(
        this.calendarForm.value.name, this.calendarForm.value.description,
        this.calId).subscribe(
          res => {
            if (res['err']) {
              this.error['err'] = res['err'].error.err;
              console.log(this.error);
            } else {
              this.getCalendarsByUserId(this.user['id']);
              this.editCalendar = false;
              this.calendarForm.reset('');
            }
          });
    }
  }

  // Get all events for logged in user
  getEventsByUserId(id: number) {
    this.eventService.getByUserId(this.user[id]);
  }


  ngOnInit() {
    this.getCalendarsByUserId(this.user['id']);
    // this.getEventsByUserId(this.user['id']);
  }

}


