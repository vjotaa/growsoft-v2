import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from './../../../auth/auth.service';
import { User } from './../../../auth/user';
import { GLOBAL } from './../../../global';
import { ProjectService } from './../../project.service';
import { UploadService } from './../../upload.service';

@Component({
  selector: "app-project-viewer",
  styleUrls: ["./project-viewer.component.scss"],
  providers: [ProjectService, UploadService],
  templateUrl: "./project-viewer.component.html"
})
export class ProjectViewerComponent implements OnInit {
  public project: any;
  public projectDetail: any;
  public user: User;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;
  public tools: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      this.projectService.getProject(this.token, id).subscribe(
        response => {
          console.log(response.project);
          if (!response.project) {
            this.router.navigate(["/"]);
          } else {
            this.project = response.project;
            this.tools = response.project.tools;
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
    });
  }
}
