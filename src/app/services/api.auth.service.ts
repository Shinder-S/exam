import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

    validateUserCredentials(email:string, password: string){

        //backend call

        return email == 'a' && password == 'a'
    }

}