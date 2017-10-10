import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactModule } from 'app/contact/contact.module';
import { ProjectModule } from 'app/project/project.module';
import { NgsRevealModule } from 'ng-scrollreveal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { HomeModule } from './home/home.module';
import { ProposalModule } from './proposal/proposal.module';

//Custom Module
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgsRevealModule.forRoot(),
    AuthModule,
    HomeModule,
    ArticleModule,
    ProjectModule,
    ContactModule,
    ProposalModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
