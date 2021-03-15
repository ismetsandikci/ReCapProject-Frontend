import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  carsDetail: Car[] = [];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarsAll();
    this.getCarsDetails();
  }

  getCarsAll() {
    this.carService.getCarsAll().subscribe(response=>{
      this.cars = response.data
    })
  }

  getCarsDetails() {
    this.carService.getCarsDetails().subscribe(response=>{
      this.carsDetail = response.data
    })
  }
}
