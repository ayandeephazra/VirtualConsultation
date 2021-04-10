import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { AppUiModule } from '../app-ui.module';
import {PatientLoginRoutingModule} from './patient-login-routing.module';


@NgModule({
  declarations: [PatientLoginComponent],
  imports: [
    CommonModule,
    AppUiModule,
    PatientLoginRoutingModule
  ]
})
export class PatientLoginModule { }
