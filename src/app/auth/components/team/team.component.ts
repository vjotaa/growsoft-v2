import { User } from './../../user';
import { GLOBAL } from './../../../global';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [AuthService]
})
export class TeamComponent implements OnInit {
  public users: User[];
  public identity;
  public token;
  public url: String;
  public teamGroup: string;
  public img1: string;
  public img2: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
  }
  ngOnInit() {
    this.getUsers();
    this.teamGroup = '/assets/images/team.jpeg';
    this.img1 = '/assets/images/domore.jpeg';
    this.img2 = '/assets/images/mosaico.jpeg';
  }

  getUsers() {
    this.authService.getUsers(this.token).subscribe(
      response => {
        if (!response.users) {
          console.log('este usuario no tiene proyectos aun');
        } else {
          this.users = response.users;
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
