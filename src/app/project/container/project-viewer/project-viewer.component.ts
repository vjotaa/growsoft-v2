import { User } from './../../../auth/user';
import { UploadService } from './../../upload.service';
import { GLOBAL } from './../../../global';
import { ProjectService } from './../../project.service';
import { AuthService } from './../../../auth/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from './../../project';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-project-viewer',
  styleUrls: ['./project-viewer.component.scss'],
  providers: [ProjectService, UploadService],
  templateUrl: './project-viewer.component.html'
})
export class ProjectViewerComponent implements OnInit {
  public project: Project;
  public user: User;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;
  public isOn: boolean = false;

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

  getButtonText(): string {
    return `Switch ${this.isOn ? 'Off' : 'On'}`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }
  getProject() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.projectService.getProject(this.token, id).subscribe(
        response => {
          if (!response.project) {
            this.router.navigate(['/']);
          } else {
            this.project = response.project;
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
