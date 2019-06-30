import { Component, OnInit, } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  users: User[] = [];

  email: string;
  dob: Date;
  public firstname: string;
  public lastname: string;
  addressline: string;
  zipcode: string;
  city: string;
  country: string;
  billingAddress: string;
  billingZipcode: string;
  billingCity: string;
  billingCountry: string;

  id: string;
  setDob: any;
  
  


  constructor( private authService: AuthService, private router: Router, private alertService: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let id = localStorage.getItem('USER_ID')
    this.authService.getUserById(id).subscribe(res => {
      this.email = res['email']
      this.dob = res['dob'];
      this.firstname = res['firstname'];
      this.lastname = res['lastname'];
      this.addressline = res['addressline'];
      this.zipcode = res['zipcode'];
      this.city = res['city'];
      this.country = res ['country'];
      this.billingAddress = res['billingAddress'];
      this.billingZipcode = res['billingZipcode'];
      this.billingCity = res['billingCity'];
      this.billingCountry = res['billingCountry'];
     
    

    })
  }


  delete() {
    this.id = localStorage.getItem('USER_ID')

    this.authService.deleteUser(this.id)
      .subscribe(res => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem('USER_ID')
        this.authService.CurrentUserFirstnameSubject.next(null);
        this.authService.CurrentUserLastnameSubject.next(null);

        this.router.navigateByUrl('/login');
        this.alertService.success(res['message'], false)
      })

  }
}

