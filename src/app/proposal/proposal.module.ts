import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NotificationProposalComponent } from './notification-proposal/notification-proposal.component';
import { ProposalRoutingModule } from './proposal-routing.module';
import {
  CreateProposalProjectComponent,
} from './proposals-project/create-proposal-project/create-proposal-project.component';
import { EditProposalProjectComponent } from './proposals-project/edit-proposal-project/edit-proposal-project.component';
import { CreateProposalWorkComponent } from './proposals-work/create-proposal-work/create-proposal-work.component';
import { EditProposalWorkComponent } from './proposals-work/edit-proposal-work/edit-proposal-work.component';

@NgModule({
  imports: [CommonModule, ProposalRoutingModule, FormsModule],
  declarations: [
    CreateProposalWorkComponent,
    EditProposalWorkComponent,
    EditProposalProjectComponent,
    CreateProposalProjectComponent,
    NotificationProposalComponent
  ]
})
export class ProposalModule {}
