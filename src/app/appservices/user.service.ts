import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../models/user.model';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private appUrl='http://local.edmin-lumen.com/';

  constructor(private http:HttpClient) { }


  datatableInit(){  
    $('.datatable-1').dataTable();
  }

  public getAllUser(): Observable<User>{
    return this.http.get<User>(this.appUrl+'users');
  }

  public getCountries(){
    return this.http.get(this.appUrl + 'countries')
  }

  public getStates(cid){
    return this.http.get(this.appUrl + 'states/' + cid)
  }

  public getCities(sid){
    return this.http.get(this.appUrl + 'cities/' + sid)
  }

  public addUser(data){
    return this.http.post(this.appUrl + 'addUser',data);
  }

  public updateUser(data){
    return this.http.post(this.appUrl + 'updateUser',data);
  } 

  public editUser(id){
    return this.http.get(this.appUrl + 'editUser/' +id);
  } 

  public deleteUser(id):Observable<User>{
    return this.http.get<User>(this.appUrl + 'deleteUser/'+id );
}

}
