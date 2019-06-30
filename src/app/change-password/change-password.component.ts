import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) { }

  changePassword: FormGroup;
  loading: boolean = false
  submitted: boolean = false;

  ngOnInit() {
    let id = localStorage.getItem('USER_ID')

    this.changePassword = this.formBuilder.group({
      _id: [id],
      password: ['', Validators.required]
    })
  }
  get formControls() { return this.changePassword.controls }

  submitPassword() {
    this.submitted = true;

    if (this.changePassword.invalid) {
      return;
    }
    this.loading = false;

    this.authService.changePassword(this.changePassword.value)
      .subscribe(res => {
        this.alertService.success('Lösenordet är ändrat', false)

      },
        error => {
          this.alertService.error(error);
          console.log(error)
          this.loading = false;
        });
  }

}
