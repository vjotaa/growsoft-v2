import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
import { ProjectService } from '../../../project/project.service';
import { NotificationProposal } from '../../notification-proposal';
import { ProposalService } from '../../proposal.service';
import { ProposalProject } from '../proposal-project';

@Component({
  selector: "app-create-proposal-project",
  templateUrl: "./create-proposal-project.component.html",
  styleUrls: ["./create-proposal-project.component.scss"],
  providers: [ProposalService, ProjectService]
})
export class CreateProposalProjectComponent implements OnInit {
  proposalP: ProposalProject;
  notificationP: NotificationProposal;
  token;
  identity;
  fullStack;
  programmers;
  designers;
  checkD;
  check;
  usersJobs;
  usersDesigners;
  usersProgrammers;
  usersFullStack;
  peopleSelected;
  alertMessage;
  tools;
  toolsSelected;
  usersCheck;

  constructor(
    private authService: AuthService,
    private proposalService: ProposalService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = authService.getToken();
    this.identity = authService.getIdentity();
    this.usersDesigners = [];
    this.usersProgrammers = [];
    this.usersFullStack = [];
    this.designers = [];
    this.usersCheck = [];
    this.programmers = [];
    this.fullStack = [];
    this.notificationP = new NotificationProposal("", "", "");
    this.proposalP = new ProposalProject(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
  }

  ngOnInit() {
    this.getTools();
    this.authService.getUsersByJob(this.token, "").subscribe(res => {
      if (res) {
        for (var index = 0; index < res.length; index++) {
          if (res[index].jobs) {
            if (res[index].jobs.name == "diseñador") {
              this.usersDesigners.push(res[index]);
            }
            if (res[index].jobs.name == "Full stack") {
              this.usersFullStack.push(res[index]);
            }
            if (res[index].jobs.name == "Desarrollador") {
              this.usersProgrammers.push(res[index]);
            }
          }
        }
        this.usersJobs = res;
        this.checkD = [];
      }
    });
  }

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let user_id = this.identity._id;
      this.peopleSelected = this.checkD.join();
      this.toolsSelected = this.check.join();
      this.proposalP.user = user_id;
      for (var i = 0; i < this.checkD.length; i++) {
        this.usersCheck.push(this.checkD[i]._id);
        if (this.checkD[i].jobs.name == "diseñador") {
          this.designers.push(this.checkD[i]._id);
        }
        if (this.checkD[i].jobs.name == "Full stack") {
          this.fullStack.push(this.checkD[i]._id);
        }
        if (this.checkD[i].jobs.name == "Desarrollador") {
          this.programmers.push(this.checkD[i]._id);
        }
      }
      this.proposalP.programmers = this.programmers.join();
      this.proposalP.designers = this.designers.join();
      this.proposalP.fullStack = this.fullStack.join();
      this.proposalP.tools = this.toolsSelected;

      this.proposalService
        .addProposalProject(this.token, this.proposalP)
        .subscribe(
          response => {
            if (!response.proposalProject) {
              this.alertMessage = "Error en el servidor";
              console.log(response.proposalProject);
            } else {
              this.alertMessage = "El proyecto fue creado existosamente";
              let proposal_id = response.proposalProject._id;
              this.notificationP.users = this.usersCheck.join();
              this.notificationP.proposal_project = proposal_id;
              this.sendNotification(this.token, this.notificationP);
              console.log(response.proposalProject);
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

  updateCheckedD(value, event) {
    if (event.target.checked) {
      this.checkD.push(value);
    } else if (!event.target.checked) {
      const index = this.checkD.indexOf(value);
      this.checkD.splice(index, 1);
    }
    console.log(this.checkD);
  }

  updateCheckedTools(value, event) {
    if (event.target.checked) {
      this.check.push(value);
    } else if (!event.target.checked) {
      const index = this.check.indexOf(value);
      this.check.splice(index, 1);
    }
    console.log(this.check);
  }

  getTools(): void {
    this.projectService.getTools(this.token, "").subscribe(response => {
      if (response) {
        this.tools = response;
        this.check = [];
      }
    });
  }

  sendNotification(token, notificationContent) {
    this.proposalService
      .addNotificationToProposal(token, notificationContent)
      .subscribe(response => {
        console.log(response.notification);
        if (!response.notification) {
          console.log(response.notificationProposal);
        } else {
          console.log(response.notificationProposal);
        }
      });
  }
}
