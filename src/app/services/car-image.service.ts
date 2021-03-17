import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiURL = 'https://localhost:44326/api/';

  apiImagesURL = 'https://localhost:44326';

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiURL + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiURL + "carimages/getimagesbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
