import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../auth.service';
import { User } from '../../user';
import { GLOBAL } from './../../../global';

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"]
})
export class RegisterUserComponent implements OnInit {
  rForm: FormGroup;
  public title = "Registro de usuario";
  public user: User;
  public identity;
  public token;
  public alertMessage: String;
  public url: String;
  public alert: String;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.user = new User("", "", "", "", "", "", "", "", "");
    this.url = GLOBAL.url;

    this.rForm = fb.group({
      register: fb.group({
        name: [null, Validators.compose([Validators.required])],
        lastname: [null, Validators.compose([Validators.required])],
        email: [
          null,
          Validators.compose([Validators.required, Validators.email])
        ],
        biography: [null, Validators.compose([Validators.required])],
        password: [null, Validators.required]
      })
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        if (!response.user) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.alertMessage = "El usuario fue creado existosamente";
          this.user = response.user;
          this.router.navigate(["/inicio"]);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
      }
    );
  }
}
