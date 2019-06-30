import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  changeEmail: FormGroup;

  loading: boolean = false
  submitted: boolean = false;
  ngOnInit() {
    let id = localStorage.getItem('USER_ID')

    this.changeEmail = this.formBuilder.group({
      _id: [id],
      email: ['', Validators.required]
    })
  }
  get formControls() { return this.changeEmail.controls }

  submitEmail() {
    this.submitted = true;

    if (this.changeEmail.invalid) {
      return;
    }
    this.loading = false;

    this.authService.changeEmail(this.changeEmail.value)
      .subscribe(res => {
        console.log(res)
        this.alertService.success('E-mail är ändrat.', false)
      },
        error => {
          this.alertService.error(error);
          this.loading = false;
          console.log('test')
        })

  }
}
