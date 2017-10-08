import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GLOBAL } from './../global';
import { Project } from './project';

@Injectable()
export class ProjectService {
  public url: string;
  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  getProject(token, id: string) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "proyecto/" + id, options)
      .map(res => res.json());
  }

  editProject(token, id: string, project: Project) {
    let params = JSON.stringify(project);
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this.http
      .put(this.url + "actualizar-proyecto/" + id, params, { headers: headers })
      .map(res => res.json());
  }

  addProject(token, project: Project) {
    let params = JSON.stringify(project);
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this.http
      .post(this.url + "crear-proyecto", params, { headers: headers })
      .map(res => res.json());
  }

  getProjects(token, userId) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    if (userId == null) {
      return this.http
        .get(this.url + "proyectos", options)
        .map(res => res.json());
    } else {
      return this.http
        .get(this.url + "proyectos/" + userId, options)
        .map(res => res.json());
    }
  }

  deleteProject(token, id: string) {
    let headers = new Headers({
      "Content-type": "application/json",
      Authorization: token
    });

    let options = new RequestOptions({ headers: headers });
    return this.http
      .delete(this.url + "proyecto/" + id, options)
      .map(res => res.json());
  }

  getTools(token, userId: string) {
    let headers = new Headers({
      "Content-type": "application/json",
      Authorization: token
    });

    let options = new RequestOptions({ headers: headers });
    if (userId == null) {
      return this.http
        .get(this.url + "herramientas", options)
        .map(res => res.json().tools);
    } else {
      return this.http
        .get(this.url + "herramientas/" + userId, options)
        .map(res => res.json().tools);
    }
  }
}
