import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss']
})
export class FamilyHistoryComponent implements OnInit {

  constructor() { }

  MedicalIssues: string[] = ["Blood Pressure", "Sugar", "Others"];
  familyHistoryFormGroup = new FormGroup({
        name: new FormControl("", [Validators.required]),
    });
  ngOnInit(): void {
  }

}
