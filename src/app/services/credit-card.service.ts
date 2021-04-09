import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  getall():Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiURL + "creditcards/getall";
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getById(creditCardId:number):Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiURL + "creditcards/getbyid?creditCardId="+creditCardId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }

  getByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiURL + "creditcards/getbycustomerid?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  add(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiURL + "creditcards/add"; 
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  update(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiURL + "creditcards/update"; 
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  delete(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiURL + "creditcards/delete"; 
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}
