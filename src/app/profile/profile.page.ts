import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {User} from  './user';
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private _router:Router
    ,private _http:HttpService
    ,private _toastController:ToastController) { }

  data:Object;
  user:User;

  ngOnInit() {
    if(!localStorage.getItem('user'))
    {
        this.logout();
    }

    console.log(localStorage.getItem('user'));

    this.data = JSON.parse(localStorage.getItem('user'));
    console.log(this.data);

    this._http.getUser(this.data['userId']).subscribe(data=>{
      
     // console.log(data.data);

     this.user = data['data'];
     
      
      console.log(this.user);
      
      
    },
    (error)=>{
      
    }
    );




  }

  logout(){
    localStorage.removeItem('user');
    this._router.navigate(['/login']);

  }


  createToast(message:string)
  {
    const toast =this._toastController.create({
      message:message,
      duration:2000
    }).then(toast=>toast.present());
  }

}
