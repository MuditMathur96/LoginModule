import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  logIn(email:string,password:string){
    return this.http.post("https://reqres.in/api/login",{
      email:email,
      password:password
      }
    );
  }


  getUser(userId:string)
  {
    return this.http.get('https://reqres.in/api/users/'+userId);
  }
}
