import { GLOBAL } from './../../../global';
import { ProjectService } from './../../project.service';
import { AuthService } from './../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './../../project';
import { User } from './../../../auth/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public url: String;
  public projects: Project[];
  public op: any;
  public image_not_found: string;

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
    this.getProjects();
    this.image_not_found = '/assets/images/imagen-not-found.png';
  }

  getProjects() {
    this.projectService.getProjects(this.token, null).subscribe(
      response => {
        if (!response.projects) {
          console.log('este usuario no tiene proyectos aun');
        } else {
          this.projects = response.projects;
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
  }
}
