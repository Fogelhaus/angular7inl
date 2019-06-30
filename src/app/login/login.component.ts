import { Component, OnInit, Output, EventEmitter,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../services/alert.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
loading: boolean = false 

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
 
    
  }

  get formControls() { return this.loginForm.controls }

  login() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value)
    .subscribe(
      res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            localStorage.setItem("ACCESS_TOKEN", res["token"]);
            localStorage.setItem('USER_ID', res['id'])
            this.authService.CurrentUserFirstnameSubject.next(res['firstname']);
            this.authService.CurrentUserLastnameSubject.next(res['lastname']);
            

            this.router.navigateByUrl('/profile');
            this.alertService.success('Login was successful', false)
            
      },
      error => {
        this.alertService.error(error);
          this.loading = false;
      });
    
    

  }

}