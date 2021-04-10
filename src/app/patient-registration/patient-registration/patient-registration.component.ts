import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  genderList: string[] = ['Male', 'Female', 'Other'];
  patientRegister = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    dateOfBirth: new FormControl(moment(), [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.minLength(10), Validators.min(1000000000), Validators.max(9999999999)]),
    emailId: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    retypePassword: new FormControl('', [Validators.required, Validators.pattern('')])
  });
  minDob = moment((moment().startOf('day').unix() * 1000) - (101 * 365 * 86400 * 1000));
  maxDob = moment().startOf('day');
  constructor() { }

  ngOnInit(): void {
    this.patientRegister.get('retypePassword').valueChanges.subscribe((password) => {
      if (this.patientRegister.get('password').value !== password){
        this.patientRegister.get('retypePassword').setErrors(Validators.pattern);
      }
    });
  }

  register(){

  }
}
