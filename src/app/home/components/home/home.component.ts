import { GLOBAL } from './../../../global';
import { ProjectService } from './../../../project/project.service';
import { AuthService } from './../../../auth/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from './../../../project/project';
import { User } from './../../../auth/user';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProjectService, AuthService]
})
export class HomeComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public url: String;
  public projects: Project[];
  public op: any;
  public logoPath: string;
  public section_1_Img: string;
  public image_not_found: string;
  appear = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
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
    this.logoPath = '/assets/images/rabi4.png';
    this.section_1_Img = '/assets/images/pack.png';
    this.image_not_found = '/assets/images/imagen-not-found.png';
  }

  @HostListener('window:scroll')
  onScroll() {
    let number = this.document.body.scrollTop;

    if (number == 0) {
      this.appear = true;
    }
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
