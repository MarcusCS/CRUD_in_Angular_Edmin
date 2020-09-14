import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() { }

  datatableInit(){
    $('.datatable-1').dataTable({
       "ajax": {
        url:'https://datatables.net/examples/ajax/data/arrays.txt?_=1599564098095',
        dataSrc:'data',
       }
    });
    $('.dataTables_paginate').addClass("btn-group datatable-pagination");
    $('.dataTables_paginate > a').wrapInner('<span />');
    $('.dataTables_paginate > a:first-child').append('<i class="icon-chevron-left shaded"></i>');
    $('.dataTables_paginate > a:last-child').append('<i class="icon-chevron-right shaded"></i>');
  }

}
