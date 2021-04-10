import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  appointmentBooked = false;
  ngOnInit(): void {
    this.appointmentBooked = false;
    this.route.paramMap.subscribe((res) => {
      this.appointmentBooked = res["params"].status;
    });
  }

}
