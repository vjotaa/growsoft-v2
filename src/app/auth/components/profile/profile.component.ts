import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Article } from '../../../article/article';
import { ArticleService } from '../../../article/article.service';
import { GLOBAL } from './../../../global';
import { Project } from './../../../project/project';
import { ProjectService } from './../../../project/project.service';
import { AuthService } from './../../auth.service';
import { User } from './../../user';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [ProjectService, AuthService, ArticleService]
})
export class ProfileComponent implements OnInit {
  image_not_found: string;
  public user: User;
  public identity;
  public token;
  public url: String;
  public projects: Project[];
  public articles: Article[];
  public limit: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private articleService: ArticleService
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getUser();
    this.image_not_found = "/assets/images/imagen-not-found.png";
  }

  onLimit() {
    if (!this.limit) {
      this.limit = true;
    } else if (this.limit) {
      this.limit = false;
    }
  }
  getUser() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      this.authService.getUser(this.token, id).subscribe(
        response => {
          if (!response.user) {
            this.router.navigate(["/"]);
          } else {
            this.user = response.user;
            this.projectService
              .getProjects(this.token, response.user._id)
              .subscribe(
                response => {
                  if (!response.projects) {
                    console.log("este usuario no tiene proyectos aun");
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
            this.articleService
              .getArticles(this.token, response.user._id)
              .subscribe(result => {
                if (!result.articles) {
                  console.log("Este usuario no tiene articulos aun");
                } else {
                  this.articles = result.articles;
                }
              });
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
  onDeleteProject(id) {
    this.projectService.deleteProject(this.token, id).subscribe(
      response => {
        if (!response.project) {
          console.log("Error in the server");
        } else {
          this.getUser();
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
