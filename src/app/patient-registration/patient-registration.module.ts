import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { AppUiModule } from '../app-ui.module';



@NgModule({
  declarations: [PatientRegistrationComponent],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    AppUiModule
  ]
})
export class PatientRegistrationModule { }
