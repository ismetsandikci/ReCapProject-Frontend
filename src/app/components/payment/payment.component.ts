import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carDetail: CarDto[] = [];
  carToBeRented : Rental;
  creditCardForm : FormGroup;
  saveCreditCard: boolean = false;
  creditCardOk: boolean = false;
  useRegisteredCard : boolean = false;
  carBrandName : string;
  carModelName : string;

  isCustomerCreditCards: boolean = false;
  customerCreditCards: CreditCard[] = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private carService: CarService,
    private creditCardService: CreditCardService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.carToBeRented = this.rentalService.getRental();

    if (this.carToBeRented === undefined){
      this.router.navigate(['/cars']);
      this.toastrService.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
    }

    this.getCarDetailById(this.carToBeRented.carId);
    this.createCreditCardForm();
    this.creditCardForm.get('customerId').setValue(this.carToBeRented.customerId);
    this.getCreditCardByCustomerId(this.carToBeRented.customerId);
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe(
      (response) => {
        this.carDetail = response.data;
        this.carBrandName = this.carDetail[0].brandName;
        this.carModelName = this.carDetail[0].modelName;
    });
  }

  createCreditCardForm(){
    this.creditCardForm = this.formBuilder.group({
      customerId:["",Validators.required],
      cardNameSurname:["",Validators.required],
      cardNumber:["",Validators.required],
      cardExpiryDateMonth:["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      cardExpiryDateYear:["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      cardCvv:["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  getCreditCardByCustomerId(customerId:number){
    this.creditCardService.getByCustomerId(customerId).subscribe(
      (response) => {
        this.customerCreditCards = response.data;
        if(this.customerCreditCards.length>0){
          this.isCustomerCreditCards = true;
        }
    });
  }

  creditCardsSelected(creditCard:string){
    console.log(creditCard);
    if(creditCard == "KartSeciniz"){
      this.useRegisteredCard = false;
    }
    else{
      this.useRegisteredCard = true;
    }
    var creditCardSplitted = creditCard.toString().split("-");
    this.creditCardForm.get('customerId').setValue(this.carToBeRented.customerId);
    this.creditCardForm.get('cardNameSurname').setValue(creditCardSplitted[1]);
    this.creditCardForm.get('cardNumber').setValue(creditCardSplitted[2]);
    this.creditCardForm.get('cardExpiryDateMonth').setValue(creditCardSplitted[3]);
    this.creditCardForm.get('cardExpiryDateYear').setValue(creditCardSplitted[4]);
    this.creditCardForm.get('cardCvv').setValue(creditCardSplitted[5]);

    this.carToBeRented.creditCardId = Number(creditCardSplitted[0]);
  }

  rentalRequest(){
    console.log(this.creditCardForm.valid);
    if(this.creditCardForm.valid){
      let creditCardModel=Object.assign({},this.creditCardForm.value);
      console.log(creditCardModel);

      //Kart kaydet
      if (this.saveCreditCard == true) {
        this.creditCardService.add(creditCardModel).subscribe(
          (response) => {
            var splitted = response.message.toString().split("-");
            let returnCreditCardAddMessega = splitted[0]; 
            this.carToBeRented.creditCardId = Number(splitted[1]);
            this.toastrService.success(returnCreditCardAddMessega, "Kart Ekleme Başarılı");
            this.creditCardOk = true;
            this.payRequest();
          },
          (responseError) => {
            console.log(responseError);
            if(responseError.error.length>0){
              this.toastrService.error(responseError.error,"Kart Ekleme Hatası");
            }
            if(responseError.error.ValidationErrors.length>0){
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Kart Ekleme Hatası");
              }
            }
          }
        );
      }
      else{
        this.creditCardOk = true;
        this.payRequest();
      }
    }
    else{
      this.toastrService.error("Form bigilerini kontrol ediniz","Dikkat");
    }
  }

  payRequest(){
    if(this.creditCardOk == true){
      console.log("creditCardOk true");
        this.paymentService.pay().subscribe(
          (responsePay) => {
            this.toastrService.success(responsePay.message,"Ödeme Başarılı");
            this.rentalService.add(this.carToBeRented).subscribe(
              (responseRental) => {
                this.toastrService.success(responseRental.message.toString(), "Kiralama Başarılı");
                this.router.navigate(['/rentals']);
              },
              (responseErrorRental) => {
                console.log(responseErrorRental);
                this.toastrService.error('Kiralama İşlemi Yapılamadı.','Kiralama Başarısız');
              }
            )
          },
          (responseErrorPay) => {
            console.log(responseErrorPay);
            this.toastrService.error('Ödeme İşlemi Yapılamadı.','Ödeme Başarısız');
          }
        );
    }
  }
}
