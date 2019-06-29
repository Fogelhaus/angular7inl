import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstname: any;
  lastname: any;

  currentUserFirstname: any;
  currentUserLastname: any;
users: User[] = [];

constructor(private authService: AuthService, private router: Router) {
  

  this.authService.CurrentUserFirstname.subscribe(x => this.currentUserFirstname = x)
  this.authService.CurrentUserLastname.subscribe(x => this.currentUserLastname = x)
 
  if(this.currentUserFirstname) {
    this.authService.CurrentUserFirstnameSubject.next(this.currentUserFirstname.firstname)
    this.authService.CurrentUserLastnameSubject.next(this.currentUserLastname.lastname)
  }

}


ngOnInit() {}
logout() {
  this.authService.logout()
  
}

}