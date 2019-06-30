import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { User } from '../user'

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService, private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }
  changeUserInfo: FormGroup;
  changePassword: FormGroup;

  loading: boolean = false
  submitted: boolean = false;

  currentUser: User;
  users: User[] = [];

  ngOnInit() {
    let id = localStorage.getItem('USER_ID')
    this.authService.getUserById(id).subscribe(res => {
      this.changeUserInfo.patchValue(res);
    })
    this.changeUserInfo = this.formBuilder.group({
      _id: [id],
      dob: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      addressline: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      billingAddress: ['', Validators.required],
      billingZipcode: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingCountry: ['', Validators.required],
    });


  }
  get formControls() { return this.changeUserInfo.controls }



  onSubmit() {
    this.submitted = true;

    if (this.changeUserInfo.invalid) {
      return;
    }
    this.loading = false;

    this.authService.updateUser(this.changeUserInfo.value)
      .subscribe(res => {
        this.alertService.success(`User with email ${res['email']} updated successfully`, false)
        this.router.navigateByUrl('/change')
        localStorage.setItem('currentUser', JSON.stringify(res))
        this.authService.CurrentUserFirstnameSubject.next(res['firstname']);
        this.authService.CurrentUserLastnameSubject.next(res['lastname']);
      },
        error => {
          this.alertService.error(error);
          console.log(error)
          this.loading = true;
        })
  }
  cloneAddress() {
    var isChecked = (<HTMLInputElement>document.getElementById("same")).checked;
    const regForm = this.changeUserInfo.controls;
    if (isChecked) {
      regForm['billingAddress'].setValue(regForm['addressline'].value);
      regForm['billingZipcode'].setValue(regForm['zipcode'].value);
      regForm['billingCity'].setValue(regForm['city'].value);
      regForm['billingCountry'].setValue(regForm['country'].value);
    } else {
      regForm['billingAddress'].setValue("");
      regForm['billingZipcode'].setValue("");
      regForm['billingCity'].setValue("");
      regForm['billingCountry'].setValue("");
    }

  }
}