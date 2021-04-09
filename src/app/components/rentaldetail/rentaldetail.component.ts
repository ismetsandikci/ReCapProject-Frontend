import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentaldtoService } from 'src/app/services/rentaldto.service';

@Component({
  selector: 'app-rentaldetail',
  templateUrl: './rentaldetail.component.html',
  styleUrls: ['./rentaldetail.component.css']
})
export class RentaldetailComponent implements OnInit {

  rentalDetailForm: FormGroup;
  payDetailForm: FormGroup;
  rentalDto:RentalDto[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private rentaldtoService: RentaldtoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['rentalId']) {
        this.getRentalDetailById(parameter['rentalId']);
        this.createRentalDetailForm();
        this.createPayDetailForm();
      }
    });
  }

  getRentalDetailById(rentalId:number){
    this.rentaldtoService.getRentalDetailsById(rentalId).subscribe(
      (response) => {
        this.rentalDto = response.data;

        console.log(this.rentalDto);
        this.rentalDetailForm.get('brandName').setValue(this.rentalDto[0].brandName);
        this.rentalDetailForm.get('modelName').setValue(this.rentalDto[0].modelName);
        this.rentalDetailForm.get('modelYear').setValue(this.rentalDto[0].modelYear);
        this.rentalDetailForm.get('dailyPrice').setValue(this.rentalDto[0].dailyPrice);
        this.rentalDetailForm.get('userName').setValue(this.rentalDto[0].userName);
        this.rentalDetailForm.get('companyName').setValue(this.rentalDto[0].companyName);
        this.rentalDetailForm.get('rentDate').setValue(this.rentalDto[0].rentDate);
        this.rentalDetailForm.get('returnDate').setValue(this.rentalDto[0].returnDate);
        this.rentalDetailForm.get('amountPaye').setValue(this.rentalDto[0].amountPaye);

        this.payDetailForm.get('cardNameSurname').setValue(this.rentalDto[0].cardNameSurname);
        this.payDetailForm.get('cardNumber').setValue(this.rentalDto[0].cardNumber);
        let cardExpiryDate = this.rentalDto[0].cardExpiryDateMonth + "/" + this.rentalDto[0].cardExpiryDateYear;
        this.payDetailForm.get('cardExpiryDate').setValue(cardExpiryDate);
        this.payDetailForm.get('cardCvv').setValue(this.rentalDto[0].cardCvv);
      },
      (responseError)=>{
        this.toastrService.error(responseError,"Kiralama Detayı Getirilemedi");
        setTimeout(() => {
          this.router.navigate(['/rentals']);
        }, 3000);
      }
    );
  }

  createRentalDetailForm(){
    this.rentalDetailForm = this.formBuilder.group({
      brandName:["",Validators.required],
      modelName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      userName:["",Validators.required],
      companyName:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
      amountPaye:["",Validators.required]
    })
  }

  createPayDetailForm(){
    this.payDetailForm = this.formBuilder.group({
      cardNameSurname:["",Validators.required],
      cardNumber:["",Validators.required],
      cardExpiryDate:["",Validators.required],
      cardCvv:["",Validators.required]
    })
  }

}
