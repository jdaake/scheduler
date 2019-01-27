import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events.model';
import { Calendars } from '../models/calendars.model';
import { EventService } from '../event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CalendarService } from '../calendar.service';
import { bounceIn, flipInY, fadeIn } from 'ng-animate';
import { trigger, transition, useAnimation, } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
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
  ]
})
export class EventsComponent implements OnInit {

  calendars: Calendars[] = [];
  events: Events[] = [];
  user: {};
  error: Object = {};
  eventClicked: boolean;
  hasEvents: boolean;
  calName: string;
  eventId;
  eventEdit = false;

  // new event form group
  eventForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'date': new FormControl('', [Validators.required]),
    'duration': new FormControl('', [Validators.required]),
  });

  constructor(private eventService: EventService,
    private userService: UserService,
    private calendarService: CalendarService,
    private router: Router) {
    this.user = this.userService.user;
    this.calName = this.calendarService.calName;
  }


  backToCals() {
    this.router.navigate(['/calendar']);
  }

  // Get all events for logged in user
  getEventsByUserId(id) {
    this.eventService.getByUserId(this.user[id]).subscribe(
      res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
        } else {
          this.events = res;
        }
        if (this.events.length === 0) {
          this.hasEvents = false;
        } else {
          this.hasEvents = true;
        }
      }
    );
  }

  // get the events for a specific calendar
  getEventsByCalId() {
    this.eventService.getByCalendarId(this.calendarService.calId).subscribe(
      res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
        } else {
          this.events = res;
        }
        if (this.events.length === 0) {
          this.hasEvents = false;
        } else {
          this.hasEvents = true;
        }
      });
  }

  // Add new event by passing Calendar index
  addEvent() {
    this.error = {};
    if (this.eventForm.invalid) {
      console.log('All fields are required');
    } else {
      this.eventService.addEvent(this.eventForm.value.name,
        this.eventForm.value.description,
        this.eventForm.value.date,
        this.eventForm.value.duration,
        this.calendarService.calId).subscribe(
          // this.calendars[idx].id).subscribe(
          res => {
            if (res['err']) {
              this.error['err'] = res['err'].error.err;
              console.log(this.error);
            } else {
              this.getEventsByCalId();
              this.eventForm.reset('');
            }
          });
    }
  }

  updateEvent(idx) {
    this.eventId = this.events[idx].id;
    this.eventEdit = true;

  }
  editEvent() {
    this.error = {};
    if (this.eventForm.valid) {
      this.eventService.updateEvent(
        this.eventForm.value.name,
        this.eventForm.value.description,
        this.eventForm.value.date,
        this.eventForm.value.duration,
        this.eventId).subscribe(
          res => {
            if (res['err']) {
              this.error['err'] = res['err'].error.err;
              console.log(this.error);
            } else {
              this.getUpdatedEvents(this.calendarService.calId);
              this.eventEdit = false;
              this.eventForm.reset('');
            }
          });
    }
  }

  // delete event by passing event index and calendarId
  deleteEvent(idx) {
    this.error = {};
    // pass the index through the click and then call the interface array and use dot notation to get the id
    this.eventService.deleteEvent(this.events[idx].id).subscribe(
      res => {
        if (res['err']) {
          this.error['err'] = res['err'].error.err;
          console.log(this.error);
        } else {
          // pass calId to get update array
          this.getUpdatedEvents(this.calendarService.calId);
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
        if (this.events.length === 0) {
          this.hasEvents = false;
        } else {
          this.hasEvents = true;
        }
      });
  }

  ngOnInit() {
    this.getEventsByCalId();
  }

}
