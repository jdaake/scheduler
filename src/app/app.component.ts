import { Component } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'schedulingApp';
  user;
  localStorageUser = true;

  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.user;
  }
  toggleView(bool) {
    this.localStorageUser = bool;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  // checkUser() {
  //   if (localStorage.getItem('user')) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    console.log(localStorage);
  }

}


