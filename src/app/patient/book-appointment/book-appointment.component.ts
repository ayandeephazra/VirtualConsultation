import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {

  constructor(private router: Router) { }
  date = new FormControl(moment());
  ngOnInit(): void {
  }
  book(){
    this.router.navigate(['/home', {status: true}]);
  }
}
