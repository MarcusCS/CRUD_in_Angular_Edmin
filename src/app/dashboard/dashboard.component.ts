import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../appservices/datatable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public datatableService: DatatableService) { }

  ngOnInit(): void {
    this.datatableService.datatableInit();
  }

}
