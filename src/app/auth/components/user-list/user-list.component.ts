import { AuthService } from './../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: User[];
  public identity;
  public token;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService
  ) { }

  ngOnInit() {
  }

}
