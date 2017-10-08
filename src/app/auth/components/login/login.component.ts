import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../user';
import { GLOBAL } from './../../../global';
import { AuthService } from './../../auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;
  public title = "Iniciar sesion";
  public user: User;
  public identity;
  public token;
  public alertMessage: String;
  public url: String;
  public alert: string;
  public logoPath: string;
  public videoPath: string;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.user = new User("", "", "", "", "", "", "", "", "");
    this.url = GLOBAL.url;

    this.rForm = fb.group({
      login: fb.group({
        email: [
          null,
          Validators.compose([Validators.required, Validators.email])
        ],
        password: [null, Validators.required]
      })
    });
  }

  ngOnInit() {
    this.alert = "/assets/images/alerpelao.png";
    this.logoPath = "/assets/images/rabi4.png";
    this.videoPath = "/assets/videos/discussing_features.ogv";
  }

  onSubmit() {
    this.authService.signUp(this.user).subscribe(
      res => {
        let identity = res.user;
        this.identity = identity;
        if (!this.identity._id) {
          console.log("El usuario no puede identificarse");
        } else {
          localStorage.setItem("identity", JSON.stringify(identity));
          this.authService.signUp(this.user, "true").subscribe(
            res => {
              let token = res.token;
              this.token = token;
              if (this.token.lenght <= 0) {
                console.log("EL token no se ha generado");
              } else {
                localStorage.setItem("token", token);
                this.user = new User("", "", "", "", "", "", "", "", "");
                this.authService.sendIden(this.identity);
                this.router.navigate(["/inicio"]);
              }
            },
            error => {
              var alertMessage = <any>error;
              if (alertMessage != null) {
                var body = JSON.parse(error._body);
                this.alertMessage = body.message;
                console.log("error: " + error);
              }
            }
          );
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
