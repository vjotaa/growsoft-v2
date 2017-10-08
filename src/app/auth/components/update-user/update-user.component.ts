import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GLOBAL } from '../../../global';
import { AuthService } from '../../auth.service';
import { User } from '../../user';

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.scss"]
})
export class UpdateUserComponent implements OnInit {
  public rForm: FormGroup;
  public user: User;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;
  public filesToUpload: Array<File>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.url = GLOBAL.url;

    this.rForm = fb.group({
      update: fb.group({
        name: [null, Validators.compose([Validators.required])],
        lastname: [null, Validators.compose([Validators.required])],
        biography: [null, Validators.compose([Validators.required])]
        // email: [null, Validators.compose([Validators.email])]
      })
    });
  }

  ngOnInit() {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.user = this.identity;
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onSubmit() {
    this.authService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          console.log(response.user);
          this.alertMessage = "El usuario no se ha actualizado.";
        } else {
          console.log("desde el this.user" + this.user.name);
          console.log("desde el response.user" + response.user.name);
          localStorage.setItem("identity", JSON.stringify(this.user));

          let identity = this.user;
          this.identity = identity;
          this.authService.sendIden(this.identity);
          if (!this.filesToUpload) {
          } else {
            this.makeFileRequest(
              this.url + "imagen-usuario/" + this.user._id,
              [],
              this.filesToUpload
            ).then((result: any) => {
              this.user.image = result.image;
              localStorage.setItem("identity", JSON.stringify(this.user));
              let image_path = this.url + "ver-imagen/" + this.user.image;
            });
          }
          this.alertMessage = "El usuario se ha actualizado";
          this.authService.sendIden(this.identity);
          this.router.navigate(["/usuario/", this.identity._id]);
        }
      },
      error => {
        var alertMessage = <any>error;
        if (alertMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
        }
      }
    );
  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;
    return new Promise(function(resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("image", files[i], files[i].name);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Authorization", token);
      xhr.send(formData);
    });
  }
}
