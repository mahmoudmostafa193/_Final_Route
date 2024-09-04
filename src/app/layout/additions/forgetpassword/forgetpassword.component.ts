import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { validateHeaderValue } from 'node:http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  emailFormFlag:boolean=true
  codeFormFlag:boolean=false
  newPasswordFormFlag:boolean=false
  errMsg!: string;
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService,private _Router :Router) {}
  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{4-}$/),
    ]),
  });
  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
    ]),

  });
  submitEmailForm() {
    this.isLoading = true;
    if (this.emailForm.valid) {
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.emailFormFlag=false
          this.codeFormFlag=true
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
        },
      });
    }
    console.log(this.emailForm.value);
  }
  submitCodeForm() {
    this.isLoading = true;
    if (this.codeForm.valid) {
      this._AuthService.verifyResetCode(this.emailForm.value).subscribe({
        next: (res) => {
          this.codeFormFlag=false
          this.newPasswordFormFlag=true
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
        },
      });
    }
    console.log(this.emailForm.value);
  }
  submitNewPassworForm() {
    this.isLoading = true;
    if (this.newPasswordForm.valid) {
      this._AuthService.resetNewPassword(this.newPasswordForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('userToken',res.token)
          this._AuthService.decodeUserData();
          this._Router.navigate(['/Home'])
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
        },
      });
    }
    console.log(this.newPasswordForm.value);
  }
}
