import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMsg!:string;
  isLoading:boolean=false;
constructor(private _AuthService:AuthService,private _Router:Router)
{}
  loginForm:FormGroup=new FormGroup(
    {
      email:new FormControl(null,[Validators.email,Validators.required]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
   
    }
  )

  submitLogin()
  {
    this.isLoading=true;

    if(this.loginForm.valid)
    {
this._AuthService.signin(this.loginForm.value).subscribe(
  {
    next: (res)=>{
   console.log(res);
   this._Router.navigate(['/Home'])
   this.isLoading=false;
   localStorage.setItem('userToken',res.token)
   this._AuthService.decodeUserData();
   
     },
     error:(err)=>
     {
       console.log(err)
       this.errMsg=err.error.message;
       this.isLoading=false;
       
     }
   
   }
)
    }
    

  }
}
