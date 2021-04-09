import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CustomerDto } from 'src/app/models/customerDto';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {

  rentalCarForm : FormGroup;
  customers: CustomerDto[] = [];
  amountPaye: number = 0;

  carDto: CarDto[] = [];
  carImages: CarImage[] = [];
  carImageUrlDefault: string = this.carImageService.apiImagesURL;
  carImageUrl: string = '';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['carId']) {
        this.getCarDetailById(parameter['carId']);
        this.getCarImagesByCarId(parameter['carId']);
        this.getCustomersDetails();
        this.createRentalForm();
      }
    });
  }

  createRentalForm(){
    this.rentalCarForm = this.formBuilder.group({
      customerId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.carDto = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.carImageUrl = this.carImageUrlDefault + '' + this.carImages[0].imagePath;
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
    this.carImageUrl = this.carImageUrlDefault + '' + carImage.imagePath;
  }

  chooseOtherPhotoByImageUrl(imageUrl: string) {
    var sortedImages = this.carImages.sort((p) => p.carImageId);
    for (let i = 0; i < sortedImages.length; i++) {
      const element = this.carImageUrlDefault + '' + sortedImages[i].imagePath;
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

  getCustomersDetails() {
    this.customerService.getCustomersDetails().subscribe((response) => {
      this.customers = response.data;
    });
  }

  createRentalRequest(car: CarDto) {
    if(this.rentalCarForm.valid){
      let rentalCarModel=Object.assign({},this.rentalCarForm.value);

      if (rentalCarModel.returnDate < rentalCarModel.rentDate) {
        this.toastrService.error('Teslim Tarihi, Kiralama Tarihinde önce seçilemez.');
      }
      else if (rentalCarModel.returnDate == rentalCarModel.rentDate) {
        this.toastrService.error('Kiralama Tarihi ve Teslim Tarihi aynı olamaz.');
      }
      else{
        this.toastrService.info('Bilgileriniz kontrol ediliyor.');
        
        var date1 = new Date(rentalCarModel.returnDate.toString());
        var date2 = new Date(rentalCarModel.rentDate.toString());
        var difference = date1.getTime() - date2.getTime();
        var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
        this.amountPaye = numberOfDays * car.dailyPrice;

        if (this.amountPaye <= 0) {
          this.router.navigate(['/cardetails/' + car.carId]);
          this.toastrService.error('Araç listesine yönlendiriliyorsunuz','Hatalı işlem');
        }
        else{
          let carToBeRented: Rental = {
            carId: car.carId,
            customerId: Number(rentalCarModel.customerId),
            rentDate: rentalCarModel.rentDate,
            returnDate: rentalCarModel.returnDate,
            amountPaye: Number(this.amountPaye.toString())
          };
          this.checkFindeksScoreSufficiency(carToBeRented);
        }
      }
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }

  checkFindeksScoreSufficiency(carToBeRented:any){
    this.rentalService.checkFindeksScoreSufficiency(carToBeRented).subscribe(
      (response) => {
        this.toastrService.success(response.message,'Findeks Puanı Sorgusu');
        this.checkCarStatus(carToBeRented);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message,'Findeks Puanı Sorgusu');
      }
    );
  }

  checkCarStatus(carToBeRented:any){
    this.rentalService.checkCarStatus(carToBeRented).subscribe(
      (response) => {
        this.toastrService.success(response.message.toString(),'Tarihler Uygun');

        this.rentalService.setRental(carToBeRented);

        setTimeout(() => {
          this.toastrService.success('Bilgileriniz onaylandı.');
        }, 1000);
        setTimeout(() => {
          this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...','Ödeme İşlemleri');
        }, 1000);
        setTimeout(() => {
          this.router.navigate(['/payments']);
        }, 3000);
      },
      (responseError) => {
        this.toastrService.error('The car cannot be rented on the requested dates.','Kiralama Başarısız');
      }
    );
  }
}
