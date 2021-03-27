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
  
  getRentals():Observable<ListResponseModel<RentalDto>> {
    let newPath = this.apiURL + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
}
