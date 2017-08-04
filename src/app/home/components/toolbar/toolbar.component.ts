import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  identity;
  token;
  subscription: Subscription;
  imagePath;
  isScrolled = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router
  ) {
    this.subscription = this.authService.getIden().subscribe(identity => {
      this.identity = identity;
    });
  }

  ngOnInit() {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.imagePath = '/assets/images/rabi4.png';
  }

  @HostListener('window:scroll')
  onScroll() {
    let number = this.document.body.scrollTop;

    if (number > 150) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.router.navigate(['/']);
  }
}
