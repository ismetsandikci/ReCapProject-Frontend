import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDto } from '../models/customerDto';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL = 'https://localhost:44326/api/';
  
  constructor(private httpClient: HttpClient) { }

  getall():Observable<ListResponseModel<Customer>> {
    let newPath = this.apiURL + "customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  
  getbyid(customerId: number):Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiURL + "customers/getbyid?customerId=";
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath+customerId);
  }

  getbyuserid(userId: number):Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiURL + "customers/getbyuserid?userId=";
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath+userId);
  }

  getCustomersDetails():Observable<ListResponseModel<CustomerDto>> {
    let newPath = this.apiURL + "customers/getcustomerdetails";
    return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }

  add(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiURL + "customers/add"; 
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiURL + "customers/update"; 
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }

  delete(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiURL + "customers/delete"; 
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }
}
