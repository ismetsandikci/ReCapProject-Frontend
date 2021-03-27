import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  carD: Car[] = [];

  carImageUrlDefault: string = this.carImageService.apiImagesURL;
  carImageUrl: string = '';

  //RentAl formu
  customers: Customer[] = [];
  customerId: Number;
  customerName: string;
  companyName: string;
  customerEmail: string;
  rentDate!: Date;
  returnDate!: Date;
  carDailyPrice: number;
  amountPaye: number = 0;
  //!RentAl formu

  carId: number;
  carBrandName: string;
  carModelName: string;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private paymentServise: PaymentService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['carId']) {
        this.getCarDetailById(parameter['carId']);
        this.getCarImagesByCarId(parameter['carId']);
        this.getCustomersDetails();
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

      this.carImageUrl =
        this.carImageUrlDefault + '' + this.carImages[0].imagePath;
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

  createRentalRequest(car: Car) {
    if (this.customerId === undefined) {
      this.toastrService.warning('Müşteri bilgisini kontrol ediniz.');
    } else if (this.rentDate === undefined || !this.rentDate) {
      this.toastrService.warning('Alış Tarihi bilgisini kontrol ediniz.');
    } else if (this.returnDate === undefined || !this.returnDate) {
      this.toastrService.warning('Teslim Tarihi bilgisini kontrol ediniz.');
    } else if (this.returnDate < this.rentDate) {
      this.toastrService.error(
        'Teslim Tarihi, Kiralama Tarihinde önce seçilemez.'
      );
    } else if (this.returnDate == this.rentDate) {
      this.toastrService.error('Kiralama Tarihi ve Teslim Tarihi aynı olamaz.');
    } else {
      this.toastrService.info('Bilgileriniz kontrol ediliyor.');

      this.carId = car.carId;
      this.carBrandName = car.brandName;
      this.carModelName = car.modelName;
      this.carDailyPrice = car.dailyPrice;

      let carToBeRented: Rental = {
        carId: this.carId,
        customerId: parseInt(this.customerId.toString()),
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };

      this.rentalService.checkCarStatus(carToBeRented).subscribe(
        (response) => {
          this.toastrService.success(response.message.toString(),'Tarihler Uygun');

          var date1 = new Date(this.returnDate.toString());
          var date2 = new Date(this.rentDate.toString());
          var difference = date1.getTime() - date2.getTime();
          var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
          this.amountPaye = numberOfDays * this.carDailyPrice;

          if (this.amountPaye <= 0) {
            this.router.navigate(['/cardetails/' + this.carId]);
            this.toastrService.error('Araç listesine yönlendiriliyorsunuz','Hatalı işlem');
          } 
          else {
            this.paymentServise.setRental(carToBeRented, this.amountPaye);

            setTimeout(() => {
              this.toastrService.success('Bilgileriniz onaylandı.');
            }, 1000);

            setTimeout(() => {
              this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...','Ödeme İşlemleri');
            }, 1000);

            setTimeout(() => {
              this.router.navigate(['/payments']);
            }, 3000);
          }
        },
        (error) => {
          this.toastrService.error('The car cannot be rented on the requested dates.','Kiralama Başarısız');
        }
      );
    }
  }
}
