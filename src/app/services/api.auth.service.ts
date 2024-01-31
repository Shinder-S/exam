import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor() { }

  validateUserCredentials(email:string, password: string){

    //backend call

    return email == '' && password == '123abc'
  }
}