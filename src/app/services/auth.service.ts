import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public CurrentUserFirstnameSubject: BehaviorSubject<User>;
  public CurrentUserFirstname: Observable<User>;

  public CurrentUserLastnameSubject: BehaviorSubject<User>;
  public CurrentUserLastname: Observable<User>

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) {
    this.CurrentUserFirstnameSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.CurrentUserFirstname = this.CurrentUserFirstnameSubject.asObservable();

    this.CurrentUserLastnameSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.CurrentUserLastname = this.CurrentUserLastnameSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.CurrentUserFirstnameSubject.value;
  }

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/register`, userInfo);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
   
    localStorage.clear()
    this.CurrentUserFirstnameSubject.next(null);
    this.router.navigateByUrl('/login');

  }

  public getAll() {
    return this.http.get<User[]>(`${this._apiurl}/users/all`);
  }
  public getUser() {
    let id = localStorage.getItem("USER_ID");
    return this.http.get(`${this._apiurl}/users/${id}`);
  }

  public updateUser(user: User) {
    return this.http.put(`${this._apiurl}/users/` + user._id, user);
   }

  public getUserById(id: string) {
    return this.http.get(`${this._apiurl}/users/` + id);
  }
  public changePassword(user: User) {
    return this.http.put(`${this._apiurl}/users/changepass/` + user._id, user);
}
public changeEmail(user: User) {
  return this.http.put(`${this._apiurl}/users/changeemail/` + user._id, user);
}
deleteUser(id: string) {
  return this.http.delete(`${this._apiurl}/users/` + id)
}
}