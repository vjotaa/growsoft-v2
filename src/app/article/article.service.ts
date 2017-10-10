import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GLOBAL } from '../global';
import { Article } from './article';

@Injectable()
export class ArticleService {
  public url: string;
  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  getGenres(token, userId: string) {
    let headers = new Headers({
      "Content-type": "application/json",
      Authorization: token
    });

    let options = new RequestOptions({ headers: headers });
    if (userId == null) {
      return this.http
        .get(this.url + "genero", options)
        .map(res => res.json().genres);
    } else {
      return this.http
        .get(this.url + "generos/" + userId, options)
        .map(res => res.json().genres);
    }
  }

  getArticle(token, id: string) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "articulo/" + id, options)
      .map(res => res.json());
  }

  editArticle(token, id: string, article: Article) {
    let params = JSON.stringify(article);
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this.http
      .put(this.url + "actualizar-articulo/" + id, params, { headers: headers })
      .map(res => res.json());
  }

  addArticle(token, article: Article) {
    let params = JSON.stringify(article);
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this.http
      .post(this.url + "crear-articulo", params, { headers: headers })
      .map(res => res.json());
  }

  getArticles(token, userId) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    if (userId == null) {
      return this.http
        .get(this.url + "articulos", options)
        .map(res => res.json());
    } else {
      return this.http
        .get(this.url + "articulos/" + userId, options)
        .map(res => res.json());
    }
  }
}
