import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from '../global';

@Injectable()
export class AuthService {
  public url: String;
  public identity;
  public token;
  private subject = new Subject<any>();

  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  sendIden(result: string) {
    this.subject.next(result);
  }

  getIden(): Observable<any> {
    return this.subject.asObservable();
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity"));
    identity != "undefined"
      ? (this.identity = identity)
      : (this.identity = null);
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem("token");
    token != "undefined" ? (this.token = token) : (this.token = null);
    return this.token;
  }

  signUp(userToLogin, gethash = null) {
    if (!null) {
      userToLogin.gethash = gethash;
    }
    let json = JSON.stringify(userToLogin);
    let params = json;
    let headers = new Headers({ "Content-type": "application/json" });
    return this.http
      .post(this.url + "iniciar-sesion", params, { headers: headers })
      .map(res => res.json());
  }

  register(userToRegister) {
    let json = JSON.stringify(userToRegister);
    let params = json;

    let headers = new Headers({ "Content-type": "application/json" });

    return this.http
      .post(this.url + "registrar-usuario", params, { headers: headers })
      .map(res => res.json());
  }

  updateUser(userToUpdate) {
    let json = JSON.stringify(userToUpdate);
    let params = json;
    let headers = new Headers({
      "Content-type": "application/json",
      Authorization: this.getToken()
    });
    return this.http
      .put(this.url + "actualizar-usuario/" + userToUpdate._id, params, {
        headers: headers
      })
      .map(res => res.json());
  }

  getUser(token, id: String) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "usuario/" + id, options)
      .map(res => res.json());
  }

  getUsers(token) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "usuarios/", options)
      .map(res => res.json());
  }

  getUsersByJob(token, id: string): Observable<any> {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "usuarios/", options)
      .map(res => res.json().users);
  }
}
