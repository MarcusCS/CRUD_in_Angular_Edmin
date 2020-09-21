import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../appservices/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @ViewChild("tablerow", {read: ElementRef}) private tablerow: ElementRef;
  
  checkedIDs = [];
  hidden = false;
  showerror:boolean = true;
  countries: any = [];states: any = [];cities: any = [];
  usersdata: Array<any> = [{
      institute: '',
      year: '',
      percentage: ''
    }
  ];
  user: any = {};

  checkboxesDataList = [
    {
      id: '1',
      text: 'AI Researcher',
      isChecked: false
    },
    {
      id: '2',
      text: 'ML Engineer',
      isChecked: false
    },
    {
      id: '3',
      text: 'Software Developer',
      isChecked: false
    },
  ];
  
  constructor(private renderer:Renderer2, private route: Router,private userService: UserService, private router: ActivatedRoute) {
    this.router.params.subscribe(
      (param: Params) => {
        if (param.id){
          this.showerror = false;
          this.editUser(param.id)
        }
      }
    );
  }

  addRecord() {
    this.usersdata.push({
      institute:'',
      year: '',
      percentage: ''
    });
  }

  deleteRecord(index) {
    this.usersdata.splice(index, 1);
  }

  changeSelection(event) {
    if(event.target.checked){
      this.checkboxesDataList[event.target.value].isChecked = true;
    }
    else{
      this.checkboxesDataList[event.target.value].isChecked = false;
    }
    this.fetchCheckedIDs()
  }

  fetchCheckedIDs() {
    this.checkedIDs = [];
    console.log( this.checkboxesDataList);
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
    console.log(this.checkedIDs.length);
    if(this.checkedIDs.length == 0){
      this.showerror = true;
    }else{
      this.showerror = false;
    }
  }

  ngOnInit(): void {
    this.userService.getCountries().subscribe(
      (data: any) => {
        this.countries = data.countries;
      }
    );
  }

  editUser(id){
    this.userService.editUser(id).subscribe(
      (data: any) => {
        if(data.success){
          this.user = data.user;
          this.checkedIDs = data.user.education;
          this.usersdata = data.user.academics;
          this.onCountryChange(data.user['country']);
          this.onStateChange(data.user['state']);
          data.user['education'].forEach((value, index) => {
              this.checkboxesDataList[value-1].isChecked = true;
          });
        }
        else
          this.route.navigate(['/listusers']);
      }
    );
  }

  onSubmit(f: NgForm){
   console.log(f);
    this.user.academics = this.usersdata;
    this.user.education = this.checkedIDs;
    if (f.valid && (this.checkedIDs.length > 0)) {
      if (this.user.id) {                  
        this.userService.updateUser(this.user).subscribe(
          (data: any) => {
            if (data.success) {              
              this.route.navigate(['/listusers']);
            }
            else {
              alert("Something went Wrong");
            }
          }
        );
      }
    else
    {
      this.userService.addUser(this.user).subscribe(
        (data: any) => {
          if (data.success) {
            alert(data.message);
            this.route.navigate(['/listusers']);
          }
          else {
            alert("Something went Wrong");
          }
        }
      );
    }
    }
  }
  onCountryChange(cid){
    this.userService.getStates(cid).subscribe(
      (data: any) => {
        this.states = data.states;      
      }
    );
  }

  onStateChange(sid){
    this.userService.getCities(sid).subscribe(
      (data: any) => {
        this.cities = data.cities;
      }
    );
  }
}
