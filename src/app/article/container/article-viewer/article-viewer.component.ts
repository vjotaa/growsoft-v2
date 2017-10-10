import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
import { ArticleService } from '../../article.service';

@Component({
  selector: "app-article-viewer",
  templateUrl: "./article-viewer.component.html",
  styleUrls: ["./article-viewer.component.scss"],
  providers: [ArticleService]
})
export class ArticleViewerComponent implements OnInit {
  public token;
  public identity;
  public article;
  public genres;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
    this.identity = this.authService.getIdentity();
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      this.articleService.getArticle(this.token, id).subscribe(
        response => {
          console.log(response.article);
          if (!response.article) {
            this.router.navigate(["/"]);
          } else {
            this.article = response.article;
            this.genres = response.article.genres;
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
