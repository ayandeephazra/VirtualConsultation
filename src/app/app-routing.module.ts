import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./patient-registration/patient-registration.module').then(m => m.PatientRegistrationModule)
},
{
  path: 'login',
  loadChildren: () => import('./patient-login/patient-login.module').then(m => m.PatientLoginModule)
},
{
  path: 'home',
  loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
