import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import  {LoadingController} from '@ionic/angular';
import {Clipboard} from '@ionic-native/clipboard/ngx';


import {HttpService} from '../http.service'
//import { create } from 'domain';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {


  constructor(private _http:HttpService
    ,public toastController:ToastController
    ,private router:Router
    ,private loadingController:LoadingController
    ,private _clipboard :Clipboard
    ) { }
  
  
  
  isErrorPresent:boolean;
  error:string;

  email:string;
  password:string;

  userData:Object;

  ngOnInit() {

    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/profile']);
    }
  }

  async OnSubmit(){

    if(!this.email || this.email=="")
    {
        this.createToast("email field is empty");
    }
    else if(!this.password || this.password =="")
    {
      this.createToast('Password field is empty');
      
    }
    else{

      const loading = await this.loadingController.create({
        message:'Loading!!',
        duration:5000
      }).then(loading=>{return loading});
      
      loading.present();
    

      

      this.isErrorPresent= false;
      console.log("Button Works");
      console.log('username'+this.email);
      console.log('password'+this.password);
      this._http.logIn(this.email,this.password).subscribe(data=>{
        console.log(data);
        loading.dismiss();
        this.userData = {
          token:data['token'],
          userId:1 
        };
        console.log(this.userData)
        localStorage.setItem('user',JSON.stringify(this.userData));

        this.router.navigate(['/profile']);

      },
      (error)=>{
        loading.dismiss();
        if(error.error.error)
        {
          console.log(error.error.error)
          error = error.error.error;
          this.isErrorPresent= true;
          this.createToast(error);
        }
        else{
          console.log("Some Error Ocurred! Try Again");
          this.createToast("Some Error Ocurred! Try Again");
        }
        
       
        
      
      }
      );
    }
   
  }


  copyToClipboard(){
    this._clipboard.copy('george.bluth@reqres.in');
    this.createToast("Copied");

   

  }

  createToast(message:string)
  {
    const toast =this.toastController.create({
      message:message,
      duration:2000
    }).then(toast=>toast.present());
  }
}
