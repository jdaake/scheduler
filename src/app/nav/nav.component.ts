import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, OnDestroy {
  loggedIn;
  isLoggedIn;

  constructor(private router: Router, private userService: UserService) { }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.getLoggedIn().subscribe(res => {
      // console.log(res);
      // console.log(localStorage);
      if (localStorage.length === 0) {
        this.loggedIn = false;
      }
      if (localStorage.length > 0) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy(): void {
    this.isLoggedIn.unsubscribe();
  }

}
