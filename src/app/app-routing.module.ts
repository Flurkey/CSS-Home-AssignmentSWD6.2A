import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-form/login-form.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { AddDroneComponent } from './add-drone/add-drone.component';
import { UpdateDroneComponent } from './update-drone/update-drone.component';
import { ViewDroneComponent } from './view-drone/view-drone.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-form', pathMatch: 'full'},
  { path: 'login-form', component: LoginComponent },
  { path: 'registration-list', component: RegistrationListComponent },
  { path: 'add-drone', component: AddDroneComponent },
  { path: 'update-drone/:id', component: UpdateDroneComponent },
  { path: 'view-drone/:id', component: ViewDroneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
