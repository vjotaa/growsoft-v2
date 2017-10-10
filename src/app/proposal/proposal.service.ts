import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GLOBAL } from './../global';
import { NotificationProposal } from './notification-proposal';
import { ProposalProject } from './proposals-project/proposal-project';

@Injectable()
export class ProposalService {
  public url: string;
  constructor(private http: Http) {
    this.url = GLOBAL.url;
  }

  getProposalProject(token, id: string) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "propuesta_proyecto/" + id, options)
      .map(res => res.json());
  }

  addProposalProject(token, proposalP: ProposalProject) {
    let params = JSON.stringify(proposalP);
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this.http
      .post(this.url + "crear-propuesta-proyecto", params, { headers: headers })
      .map(res => res.json());
  }

  getStatus(token, id: string) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.url + "obtener-status/" + id, options)
      .map(res => res.json());
  }
  addNotificationToProposal(token, notificationProposal: NotificationProposal) {
    let params = JSON.stringify(notificationProposal);
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this.http
      .post(this.url + "crear-notificacion", params, { headers: headers })
      .map(res => res.json());
  }
}
