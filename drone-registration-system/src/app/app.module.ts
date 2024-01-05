import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './services/registration.service';
import { LoginComponent } from './login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AddDroneComponent } from './add-drone/add-drone.component';
import { UpdateDroneComponent } from './update-drone/update-drone.component';
import { ViewDroneComponent } from './view-drone/view-drone.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationListComponent,
    LoginComponent,
    NavbarComponent,
    AddDroneComponent,
    UpdateDroneComponent,
    ViewDroneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    RegistrationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
