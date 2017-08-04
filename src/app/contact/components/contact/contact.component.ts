import { ContactService } from './../../contact.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Contact } from './contact.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  email: string;
  emailForm: FormGroup;
  messageSentSuccess: boolean;
  messageSentError: boolean;
  events: any[] = [];

  constructor(private service: ContactService, private _fb: FormBuilder) {
    this.emailForm = this._fb.group({
      email: [null, Validators.compose([Validators.required])],
      name: [null, Validators.required],
      message: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });
  }

  ngOnInit() {
    this.email = 'vjotaa@gmail.com';
  }

  onSubmit(form: any) {
    this.service
      .postEmail(
        form.value.name.toString(),
        form.value.email.toString(),
        form.value.message.toString()
      )
      .map(res => res)
      .subscribe(
        res => {},
        error => {
          this.messageSentError = true;
          this.emailForm.reset();
          //setTimeout(()=>{this.messageSentError=false},3000);
        },
        () => {
          this.messageSentSuccess = true;
          this.emailForm.reset();
          setTimeout(() => {
            this.messageSentSuccess = false;
          }, 3000);
        }
      );
  }
}
