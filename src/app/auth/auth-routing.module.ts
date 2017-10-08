import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { TeamComponent } from './components/team/team.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  { path: "iniciar-sesion", component: LoginComponent },
  { path: "actualizar-usuario/:id", component: UpdateUserComponent },
  { path: "usuario/:id", component: ProfileComponent },
  { path: "equipo", component: TeamComponent },
  { path: "registro", component: RegisterUserComponent },
  { path: "panel-administrativo", component: AdminPanelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
