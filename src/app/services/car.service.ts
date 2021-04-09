import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }

  getCarsAll():Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getall";
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getById(carId:number):Observable<SingleResponseModel<Car>> {
    let newPath = this.apiURL + "cars/getbyid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getcarsbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getcarsbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByBrandAndColorId(brandId:number, colorId:number):Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getcarsbybrandandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsDetails():Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarDetailsById(carId:number):Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getcardetailsbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  
  /*
  getById(carId:number):Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiURL + "cars/getbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  */

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiURL + "cars/add"; 
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiURL + "cars/update"; 
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
}
