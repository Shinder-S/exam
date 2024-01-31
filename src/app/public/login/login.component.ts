import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '@/services/storage/storage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, MaxLengthValidator, MinLengthValidator, ReactiveFormsModule, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { ApiAuthService } from '@/services/api.auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers:  [ ApiAuthService ]
})



export class LoginComponent implements OnInit{
  router = inject(Router)
  storage = inject(StorageService)
  loginForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
  })
  invalidPass: boolean = false
  invalidUser: boolean = false

  regexPass : RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')

  constructor(
    private formBuilder: FormBuilder,
    private authService: ApiAuthService
  ){}

  ngOnInit(): void {

    //Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50), this.forbiddenValidator(this.regexPass)
    this.loginForm = this.formBuilder.group({
      email: ['', []],
      password: ['', []]
    })
  }
  

  forbiddenValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = regex.test(control.value);
      console.log(forbidden)
      return forbidden ? { forbiddenPass: { value: control.value } } : null;
    };
  }
  

  
  validateUserCredentials(): boolean {
    let email: string = this.loginForm.controls['email'].value
    let password: string = this.loginForm.controls['password'].value

    if(!this.authService.validateUserCredentials(email, password)){
      return false
    } else {
      return true
    }
  }


  onSubmit() {
    if(!this.validateUserCredentials()){
      this.loginForm.controls['password'].setErrors({invalidCredentials : true})
      return
    }

    console.log('credenciales validass')
    
    let dateExpiration = new Date
    dateExpiration.setMinutes(dateExpiration.getMinutes() + 10)
    this.storage.setStorage('session', {
      expiration: dateExpiration,
      userName: 'Pipo',
    })
    this.router.navigate(['/'])
  }
}
