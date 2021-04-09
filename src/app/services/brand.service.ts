import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    let newPath = this.apiURL + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getById(brandId:number):Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiURL + "brands/getbyid?brandId="+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiURL + "brands/add"; 
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiURL + "brands/update"; 
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiURL + "brands/delete"; 
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
