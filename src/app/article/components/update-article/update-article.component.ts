import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GLOBAL } from 'app/global';

import { AuthService } from '../../../auth/auth.service';
import { UploadService } from '../../../project/upload.service';
import { Article } from '../../article';
import { ArticleService } from '../../article.service';

@Component({
  selector: "app-update-article",
  templateUrl: "./update-article.component.html",
  styleUrls: ["./update-article.component.scss"],
  providers: [ArticleService, UploadService]
})
export class UpdateArticleComponent implements OnInit {
  public article: Article;
  public identity;
  public token;
  public url: string;
  public filesToUpload: Array<File>;
  public alertMessage: string;
  public genresSelected;
  public genres: any;
  public check: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private uploadService: UploadService
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
    this.article = new Article("", "", "", "", "", "");
  }

  ngOnInit() {
    this.getArticle();
    this.articleService.getGenres(this.token, "").subscribe(response => {
      if (response) {
        console.log(response);
        this.genres = response;
        console.log(this.genres);
        this.check = [];
      }
    });
  }

  getArticle() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      this.articleService.getArticle(this.token, id).subscribe(
        response => {
          if (!response.article) {
            this.router.navigate(["/"]);
          } else {
            this.article = response.article;
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

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      this.genresSelected = this.check.join();
      this.article.genres = this.genresSelected;
      this.articleService.editArticle(this.token, id, this.article).subscribe(
        response => {
          if (!response.article) {
            this.alertMessage = "Error en el servidor";
          } else {
            this.alertMessage = "El articulo fue actualizado correctamente";
            if (!this.filesToUpload) {
              this.router.navigate(["/articulo", response.article._id]);
            } else {
              this.uploadService
                .makeFileRequest(
                  this.url + "/subir-imagen-articulo/" + id,
                  [],
                  this.filesToUpload,
                  this.token,
                  "image"
                )
                .then(
                  result => {
                    this.router.navigate(["/articulo", response.article._id]);
                  },
                  error => {
                    console.log(error);
                  }
                );
            }
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

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
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
