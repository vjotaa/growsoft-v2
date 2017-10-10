import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UploadService } from 'app/project/upload.service';

import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../auth/user';
import { Article } from '../../article';
import { ArticleService } from '../../article.service';

@Component({
  selector: "app-create-article",
  templateUrl: "./create-article.component.html",
  styleUrls: ["./create-article.component.scss"],
  providers: [ArticleService, UploadService]
})
export class CreateArticleComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public article: Article;
  public url: string;
  public alertMessage: string;
  public filesToUpload: Array<File>;
  public title: string;
  public genres;
  public check: any;
  public genreSelected;
  constructor(
    private _articleService: ArticleService,
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.article = new Article("", "", null, "", "", "");
  }

  ngOnInit() {
    this._articleService.getGenres(this.token, "").subscribe(response => {
      if (response) {
        console.log(response);
        this.genres = response;
        console.log(this.genres);
        this.check = [];
      }
    });
  }

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let user_id = this.identity._id;
      this.genreSelected = this.check.join();
      this.article.user = user_id;
      this.article.genres = this.genreSelected;
      this._articleService.addArticle(this.token, this.article).subscribe(
        response => {
          if (!response.article) {
            this.alertMessage = "Error en el servidor";
            console.log(response.article);
          } else {
            this.alertMessage = "El articulo fue creado existosamente";
            this.article = response.article;
            console.log(response.article);
            this.router.navigate(["/editar-articulo", response.article._id]);
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
    });
  }

  updateChecked(value, event) {
    if (event.target.checked) {
      this.check.push(value);
    } else if (!event.target.checked) {
      const index = this.check.indexOf(value);
      this.check.splice(index, 1);
    }
    console.log(this.check);
  }
}
