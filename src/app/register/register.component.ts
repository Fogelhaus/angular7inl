import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})



export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router, private formBuilder: FormBuilder) { }

  registerForm: FormGroup;
  loading: boolean = false
  submitted: boolean = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addressline: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      billingAddress: ['', Validators.required],
      billingZipcode: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingCountry: ['', Validators.required]

    })
  }

  get formControls() { return this.registerForm.controls }


  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value)
      .subscribe(
        res => {
          this.alertService.success(res['message'], true)
          this.router.navigateByUrl('/login')
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )

  }
  cloneAddress() {
    var isChecked = (<HTMLInputElement>document.getElementById("same")).checked;
    const regForm = this.registerForm.controls;

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