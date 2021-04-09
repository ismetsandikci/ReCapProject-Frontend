import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiURL = 'https://localhost:44326/api/';
  
  carToBeRented:Rental;

  constructor(private httpClient: HttpClient) { }
  
  getAll():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiURL + "rentals/getall";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getById(rentalId:number):Observable<SingleResponseModel<Rental>> {
    let newPath = this.apiURL + "cars/getbyid?rentalId="+rentalId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }

  checkCarStatus(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/checkcarstatus";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  checkFindeksScoreSufficiency(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/checkfindeksscoresufficiency";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  add(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  update(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/update";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  delete(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiURL + "rentals/delete";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  //--

  getRental(){
    return this.carToBeRented;
  }

  setRental(rental:Rental){
    this.carToBeRented=rental;
  }
}
