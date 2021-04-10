import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PatientLoginComponent } from './patient-login/patient-login.component';



const patientLoginRoutes: Routes = [
  {
    path: '',
    component: PatientLoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(patientLoginRoutes)],
  exports: [RouterModule]
})
export class PatientLoginRoutingModule { }

