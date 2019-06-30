import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent} from   './change-email/change-email.component';
import {ChangeComponent} from   './change/change.component'
import { AuthGuard } from './services/auth.guard'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent  },
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
{ path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]  } ,
{ path: 'change-email', component: ChangeEmailComponent, canActivate: [AuthGuard]  } ,
{ path: 'change', component: ChangeComponent, canActivate: [AuthGuard]  } ,


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
