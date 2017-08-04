import { TeamComponent } from './components/team/team.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'actualizar-usuario/:id', component: UpdateUserComponent },
  { path: 'usuario/:id', component: ProfileComponent },
  { path: 'equipo', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
