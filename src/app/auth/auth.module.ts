import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TeamComponent } from './components/team/team.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [LoginComponent, UpdateUserComponent],
  declarations: [LoginComponent, UpdateUserComponent, ProfileComponent, UserListComponent, TeamComponent, RegisterUserComponent, AdminPanelComponent]
})
export class AuthModule {}
