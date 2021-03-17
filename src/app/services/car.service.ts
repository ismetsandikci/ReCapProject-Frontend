import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  getCarsAll():Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsDetails():Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  GetCarDetailsById(carId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getcardetailsbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getById(carId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getcarsbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getcarsbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandAndColorId(brandId:number, colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getcarsbybrandandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
