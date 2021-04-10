import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {

  constructor() { }
  severities: string[] = ["MILD", "MODERATE", "SEVERE"];
  symptomFormGroup = new FormGroup({
        symptom: new FormControl("", [Validators.required]),
        severity: new FormControl("", [Validators.required]),
    });
  ngOnInit(): void {
  }

}
