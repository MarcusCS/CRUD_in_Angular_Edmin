import { Component, OnInit } from '@angular/core';
import { UserService } from '../appservices/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  users: any = [];userList;
  constructor(public userService: UserService, private route: Router) { }

  ngOnInit(){
    
    $.fn.dataTable.ext.errMode = 'none';
    var _self = this;
  
    var userList = $('#userList').DataTable({
      button: ['csv', 'pdf'],         // for PDF button on datatable listing.
      ajax: (data, callback, settings) => {
        this.userService.getAllUser().subscribe(
          (data: any) => {
            this.users = data.users; 
            callback({
              aaData: this.users.slice(0, 100)
            })
          })
       
      },
      columns: [
        { data: "id" , name:"id"},
        { data: "name", name:"name" },
        { data:  "mobile",name:"mobile"},
        {
          "data": "hobbies",
          render: function (data, type, row) 
          {
            if (row.hobbies == "1")
              return "Cricket";
            else if(row.hobbies == "2")
              return "Chess";
            else
              return "Reading";
          }
        },
        { data: "email",name:"email"},
        { data: "country", name:"country"},
        {
           data: null,
           render: function (data, type, row) {
            return "<button class='btn btn-primary edit_user'>Edit</button>&nbsp;&nbsp;\
            <button  style='width:59px' class='btn btn-danger delete_user'>Delete</button>"
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('.edit_user', row).unbind('click');
        $('.edit_user', row).bind('click', () => {
           _self.route.navigate(['/editUser', data['id']]);
        });

        $('.delete_user', row).unbind('click');
        $('.delete_user', row).bind('click', () => {
           _self.deleteUser(data['id']);
        });
        return row;
      }
    });
    this.userService.datatableInit();
  }
  
  deleteUser(id) {
    if (confirm("Do you Really want to Delete")) {
      this.userService.deleteUser(id).subscribe(
        (data: any) => {
          if (data.success) {
            $('#userList').DataTable().ajax.reload();
            alert(data.message);
          }
          else {
            alert("Something Went Wrong");
          }
        }
      );
    }
  }

 
}
