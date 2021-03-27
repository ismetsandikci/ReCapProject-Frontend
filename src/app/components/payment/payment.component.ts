import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carDetail: Car[]=[];
  carToBeRented:Rental;
  payment:Payment;

  carBrandName:string;
  carModelName:string;

  //Payment 
  cardName!:string;
  cardNumber!:string;
  cardDateMonth!:string;
  cardDateYear!:string;
  cardDate:string;
  cardCvv!:string;
  amountPaye:number;

  returnPayAddMessega:string;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private carService: CarService,
  ) { }

  ngOnInit(): void {
    this.carToBeRented = this.paymentService.getRental();
    this.amountPaye = this.paymentService.getRentalAmountPaye();

    if ( (this.carToBeRented === undefined) || (this.amountPaye <= 0) ){
      this.router.navigate(['/cars']);
      this.toastrService.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
    }

    this.getCarDetailById(this.carToBeRented.carId);
  }

  getCarDetailById(carId: number) {
    this.carService.GetCarDetailsById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.carBrandName = this.carDetail[0].brandName;
      this.carModelName = this.carDetail[0].modelName;
    });
  }

  createPayment(){
    if ( (this.cardName === undefined) || (!this.cardName) ) {
      this.toastrService.warning('Kart Sahibi bilgisini kontrol ediniz.');
    }
    else if ( (this.cardNumber === undefined) || (!this.cardNumber) ){
      this.toastrService.warning('Kart Numarası bilgisini kontrol ediniz.');
    }
    else if ( (this.cardDateMonth === undefined) || (!this.cardDateMonth) )  {
      this.toastrService.warning('Tarih Ay bilgisini kontrol ediniz.');
    }
    else if ( (this.cardDateYear === undefined) || (!this.cardDateYear) )  {
      this.toastrService.warning('Tarih Yıl bilgisini kontrol ediniz.');
    }
    else if ( (this.cardCvv === undefined) || (!this.cardCvv)  ) {
      this.toastrService.warning('CVV bilgisini kontrol ediniz.');
    }
    else{
      this.cardDate = this.cardDateMonth + "/" + this.cardDateYear;

      this.payment = {
        cardNameSurname : this.cardName,
        cardNumber : this.cardNumber,
        cardExpiryDate : this.cardDate,
        cardCvv : this.cardCvv,
        amountPaye : this.amountPaye
      }

      this.paymentService.add(this.payment).subscribe(
        (response) => {
          var splitted = response.message.toString().split("-");
          this.returnPayAddMessega = splitted[0]; 
          this.carToBeRented.paymentId = Number(splitted[1]);
          
          this.toastrService.success(this.returnPayAddMessega, "Ödeme Başarılı");

          console.log(this.carToBeRented);

          this.rentalService.add(this.carToBeRented).subscribe(
            (response2) => {
            this.toastrService.success(response2.message.toString(), "Kiralama Başarılı");
            this.router.navigate(['/rentals']);
            },
            (error) => {
            this.toastrService.error('Kiralama İşlemi Yapılamadı.','Kiralama Başarısız');
            }
          )
        },
        (error) => {
          this.toastrService.error("Ödeme Başarısız");
        }
      )
    } 
  }
}
