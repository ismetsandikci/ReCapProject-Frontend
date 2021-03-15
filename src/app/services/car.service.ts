import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiURLAll = 'https://localhost:44326/api/cars/getall';

  apiURLDeatails = 'https://localhost:44326/api/cars/getcardetails';

  constructor(private httpClient: HttpClient) { }

  getCarsAll():Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiURLAll);
  }

  getCarsDetails():Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiURLDeatails);
  }
}
