import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth.service';

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"]
})
export class AdminPanelComponent implements OnInit {
  identity;
  token;
  users: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.authService.getUsers(this.token).subscribe(response => {
      if (response) {
        console.log(response);
        this.users = response;
      }
    });
  }
}
