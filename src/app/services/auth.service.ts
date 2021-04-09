import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  login(loginModel:LoginModel) {
    let newPath = this.apiURL + "auth/login"; 
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel: RegisterModel) {
    let newPath = this.apiURL + "auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }
}
