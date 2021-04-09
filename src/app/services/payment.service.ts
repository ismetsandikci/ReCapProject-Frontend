import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CreditCard } from '../models/creditCard';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  carToBeRented:Rental;
  amountPaye:number = 0;

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient ) {}

  pay():Observable<ResponseModel> {
    let newPath = this.apiURL + "payments/pay";
    return this.httpClient.get<ResponseModel>(newPath);
  }

  /*
  getall():Observable<ListResponseModel<Payment>> {
    let newPath = this.apiURL + "payments/getall";
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  add(payment:Payment):Observable<ResponseModel> {
    let newPath = this.apiURL + "payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getRental(){
    return this.carToBeRented;
  }
  
  getRentalAmountPaye(){
    return this.amountPaye;
  }

  setRental(rental:Rental, amountOfPayment:number){
    this.carToBeRented=rental;
    this.amountPaye=amountOfPayment;
  }
  */
}
