import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';


const patientRegistrationRoutes: Routes = [
  {
    path: "",
    component: PatientRegistrationComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(patientRegistrationRoutes)],
  exports: [RouterModule]
})
export class PatientRegistrationRoutingModule { }
