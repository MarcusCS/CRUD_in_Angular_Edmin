import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../appservices/datatable.service';


@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  constructor(public datatableService: DatatableService) { }

  ngOnInit(): void {
    this.datatableService.datatableInit();
  }
 
}
