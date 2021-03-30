import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  dataLoaded = false;
  checkIfCarNull = false;

  filterText="";

  cars: CarDto[]=[];
  carImages: CarImage[] = [];

  carImageUrl: string = this.carImageService.apiImagesURL;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByBrandAndColorId(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else {
        this.getCarsDetails();
      }
    });
  }

  getCarsAll() {
    this.carService.getCarsAll().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
      this.setPreviewImages(this.cars);

      if(this.cars.length==0){
        this.checkIfCarNull=true;
      }
      else{
        this.checkIfCarNull=false;
      }
    });
  }

  getCarsDetails() {
    this.carService.getCarsDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
      this.setPreviewImages(this.cars);

      if(this.cars.length==0){
        this.checkIfCarNull=true;
      }
      else{
        this.checkIfCarNull=false;
      }
    });
  }

  getById(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
      this.setPreviewImages(this.cars);

      if(this.cars.length==0){
        this.checkIfCarNull=true;
      }
      else{
        this.checkIfCarNull=false;
      }
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
      this.setPreviewImages(this.cars);

      if(this.cars.length==0){
        this.checkIfCarNull=true;
      }
      else{
        this.checkIfCarNull=false;
      }
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = response.success;
      this.setPreviewImages(this.cars);

      if(this.cars.length==0){
        this.checkIfCarNull=true;
      }
      else{
        this.checkIfCarNull=false;
      }
    });
  }

  getCarsByBrandAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = response.success;
        this.setPreviewImages(this.cars);
        
        if(this.cars.length==0){
          this.checkIfCarNull=true;
        }
        else{
          this.checkIfCarNull=false;
        }
      });
  }

  setPreviewImages(arabalar:CarDto[]){
    arabalar.forEach(car => {
      this.carImageService.getImagesByCarId(car.carId).subscribe((response) => {
        car.previewImagePath = this.carImageUrl +  "" + response.data[0].imagePath;
      });
    });
  }
}
