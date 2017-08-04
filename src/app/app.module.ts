import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgsRevealModule } from 'ng-scrollreveal';
//Custom Module
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProjectModule } from 'app/project/project.module';
import { ContactModule } from 'app/contact/contact.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgsRevealModule.forRoot(),
    AuthModule,
    HomeModule,
    ProjectModule,
    ContactModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
