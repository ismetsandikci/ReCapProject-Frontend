import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiURL = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) { }
  
  getColors():Observable<ListResponseModel<Color>> {
    let newPath = this.apiURL + "colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

}
