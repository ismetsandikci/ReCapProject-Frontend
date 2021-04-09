import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findeks } from '../models/findeks';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<ListResponseModel<Findeks>> {
    let newPath = this.apiURL + "findeks/getall";
    return this.httpClient.get<ListResponseModel<Findeks>>(newPath);
  }

  getById(id:number):Observable<SingleResponseModel<Findeks>> {
    let newPath = this.apiURL + "findeks/getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<Findeks>>(newPath);
  }

  getByCustomerId(customerId:number):Observable<SingleResponseModel<Findeks>> {
    let newPath = this.apiURL + "findeks/getbycustomerid?customerId="+customerId;
    return this.httpClient.get<SingleResponseModel<Findeks>>(newPath);
  }

  add(findeks:Findeks):Observable<ResponseModel>{
    let newPath = this.apiURL + "findeks/add"; 
    return this.httpClient.post<ResponseModel>(newPath,findeks);
  }

  update(findeks:Findeks):Observable<ResponseModel>{
    let newPath = this.apiURL + "findeks/update"; 
    return this.httpClient.post<ResponseModel>(newPath,findeks);
  }

  delete(findeks:Findeks):Observable<ResponseModel>{
    let newPath = this.apiURL + "findeks/delete"; 
    return this.httpClient.post<ResponseModel>(newPath,findeks);
  }

  
}
