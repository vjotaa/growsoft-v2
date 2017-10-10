import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CreateProposalProjectComponent,
} from './proposals-project/create-proposal-project/create-proposal-project.component';

const routes: Routes = [
  {
    path: "crear-propuesta-proyecto",
    component: CreateProposalProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule {}
