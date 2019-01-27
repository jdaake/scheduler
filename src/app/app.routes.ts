import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './events/events.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        data: { animation: 'HomePage' }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'LoginPage' }
    },
    {
        path: 'signup',
        component: SignupComponent,
        data: { animation: 'SignupPage' }
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        data: { animation: 'CalendarPage' },
        // canActivate: [AuthGuard]
    },
    {
        path: 'events',
        component: EventsComponent,
        data: { animation: 'EventsPage' }
    },
    {
        path: '**',
        redirectTo: 'home',
        data: { animation: 'HomePage' }
    }
];
