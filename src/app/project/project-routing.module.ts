import { ProjectListComponent } from './container/project-list/project-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectViewerComponent } from './container/project-viewer/project-viewer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'proyecto/:id', component: ProjectViewerComponent },
  { path: 'editar-proyecto/:id', component: ProjectEditComponent },
  { path: 'crear-proyecto', component: AddProjectComponent },
  { path: 'proyectos', component: ProjectListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
