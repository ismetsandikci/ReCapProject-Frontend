import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup;
  selectedCar: Car;
  //updateCar : Car;

  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['carId']) {
        this.getCarDetailById(parameter['carId']);
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });

  }

  getCarDetailById(carId: number) {
    this.carService.getByIdCar(carId).subscribe((response) => {
      this.selectedCar = response.data;

      this.carUpdateForm.get('carId').setValue(this.selectedCar.carId);
      this.carUpdateForm.get('brandId').setValue(this.selectedCar.brandId);
      this.carUpdateForm.get('colorId').setValue(this.selectedCar.colorId);
      this.carUpdateForm.get('modelName').setValue(this.selectedCar.modelName);
      this.carUpdateForm.get('modelYear').setValue(this.selectedCar.modelYear);
      this.carUpdateForm.get('dailyPrice').setValue(this.selectedCar.dailyPrice);
      this.carUpdateForm.get('description').setValue(this.selectedCar.description);
      console.log(this.selectedCar);
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })  
  }

  update(){
    if(this.carUpdateForm.valid){
      let updateCarModel=Object.assign({},this.carUpdateForm.value);
      console.log(updateCarModel);
      this.carService.update(updateCarModel).subscribe(
        (response) => {
          this.toastrService.success(response.message,"Başarılı");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (responseError) => {
          console.log(responseError);
          if(responseError.error.ValidationErrors.length>0){
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
            }
          }
        }
      );
    }
  }
}
