import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerResponseModel } from '../models/customerResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL = 'https://localhost:44326/api/customers/getcustomerdetails';

  constructor(private httpClient: HttpClient) { }
  
  getCustomersDetails():Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.apiURL);
  }
}
