import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactService {
  _email = 'vjotaa@gmail.com';

  constructor(private http: Http) {}

  postEmail(name: String, email: String, message: String): Observable<string> {
    let headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({ headers: headers });

    let url = `http://formspree.io/${this._email}`;
    let data = `name=${name}&email=${email}&message=${message}`;

    return this.http
      .post(url, data, options)
      .map(response => {
        console.log('email sent', response);
        console.log(url);

        return response;
      })
      .catch(this.handleError);
  }

  private handleError(err) {
    //super duper error handling
    let errMessage: string;
    if (err instanceof Response) {
      let body = err.json() || ''; //Uncaught SyntaxError: Unexpected token C in JSON at position 0
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }
}
