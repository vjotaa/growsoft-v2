import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectViewerComponent } from './container/project-viewer/project-viewer.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectListComponent } from './container/project-list/project-list.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProjectViewerComponent, ProjectEditComponent, AddProjectComponent, ProjectListComponent]
})
export class ProjectModule {}
