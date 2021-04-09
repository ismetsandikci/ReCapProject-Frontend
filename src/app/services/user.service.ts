import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  getall():Observable<ListResponseModel<User>> {
    let newPath = this.apiURL + "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  
  getbyid(userId: number):Observable<SingleResponseModel<User>> {
    let newPath = this.apiURL + "users/getbyid?userId=";
    return this.httpClient.get<SingleResponseModel<User>>(newPath + userId);
  }

  getbymail(email: string):Observable<SingleResponseModel<User>> {
    let newPath = this.apiURL + "users/getbymail?email=";
    return this.httpClient.get<SingleResponseModel<User>>(newPath + email);
  }

  add(user:User):Observable<ResponseModel>{
    let newPath = this.apiURL + "users/add"; 
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  update(user:User):Observable<ResponseModel>{
    let newPath = this.apiURL + "users/update"; 
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  delete(user:User):Observable<ResponseModel>{
    let newPath = this.apiURL + "users/delete"; 
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
}
