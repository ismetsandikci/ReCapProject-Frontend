import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentaldtoService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }
  
  getRentalDetails():Observable<ListResponseModel<RentalDto>> {
    let newPath = this.apiURL + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  getRentalDetailsById(rentalId:number):Observable<ListResponseModel<RentalDto>> {
    let newPath = this.apiURL + "rentals/getrentaldetailsbyid?rentalId="+rentalId;
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
}
