import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PatientRoutingModule} from './patient-routing.module';
import {AppUiModule} from './../app-ui.module';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import {TopNavigationComponent} from './../top-navigation/top-navigation.component';
import { from } from 'rxjs';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { SymptomsComponent } from './book-appointment/symptoms/symptoms.component';
import { FamilyHistoryComponent } from './book-appointment/family-history/family-history.component';
import { UploadDocumentsComponent } from './book-appointment/upload-documents/upload-documents.component';

@NgModule({
  declarations: [
    PatientHomeComponent,
    PatientProfileComponent,
    TopNavigationComponent,
    BookAppointmentComponent,
    SymptomsComponent,
    FamilyHistoryComponent,
    UploadDocumentsComponent,

  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    AppUiModule,

  ]
})
export class PatientModule { }
