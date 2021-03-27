import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }
  
  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiURL + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  checkCarStatus(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/checkcarstatus";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  add(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
