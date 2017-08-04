import { ProjectModule } from './../project/project.module';
import { ContactModule } from './../contact/contact.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgsRevealModule } from 'ng-scrollreveal';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ContactModule,
    ProjectModule,
    NgsRevealModule
  ],
  exports: [ToolbarComponent, FooterComponent],
  declarations: [HomeComponent, ToolbarComponent, FooterComponent]
})
export class HomeModule {}
