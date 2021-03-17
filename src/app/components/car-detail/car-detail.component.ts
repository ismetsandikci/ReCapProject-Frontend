import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages: CarImage[]=[];
  carD: Car[]=[];

  carImageUrlDefault: string = this.carImageService.apiImagesURL;
  carImageUrl: string ="";

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['carId']) {
        this.getCarDetailById(parameter['carId']);
        this.getCarImagesByCarId(parameter['carId']);
      }
    });
  }

  getCarDetailById(carId: number) {
    this.carService.GetCarDetailsById(carId).subscribe((response) => {
      this.carD = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      
      this.carImageUrl = this.carImageUrlDefault +  "" + this.carImages[0].imagePath;
    });
  }
  
  getCarouselItemClass(carImage: CarImage): string {
    let defaultClass: string = 'carousel-item';
    if (this.carImages.sort((p) => p.carId)[0].carImageId == carImage.carId) {
      return `${defaultClass} active`;
    }
    return defaultClass;
  }

  setParentImage(carImage: CarImage) {
    this.carImageUrl = this.carImageUrlDefault +  "" + carImage.imagePath;
  }

  chooseOtherPhotoByImageUrl(imageUrl: string) {
    var sortedImages = this.carImages.sort((p) => p.carImageId);
    for (let i = 0; i < sortedImages.length; i++) {
      const element = this.carImageUrlDefault +  "" + sortedImages[i].imagePath;
      if (imageUrl == element) {
        if (i == this.carImages.length - 1) {
          i = 0;
        } else {
          i++;
        }
        this.setParentImage(sortedImages[i]);
        break;
      }
    }
  }

}
