import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';



const patientRoutes: Routes = [
  {
    path: '',
    component: PatientHomeComponent
  },

  {
    path: 'profile',
    component: PatientProfileComponent
  },
  {
    path: 'appointment',
    component:BookAppointmentComponent
  },
  {
    path: ':status',
    component: PatientHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(patientRoutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
