import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;
  addCar : Car;
  addCarImage : CarImage;
  brands: Brand[] = [];
  colors: Color[] = [];

  files: string[] = [];
  fileToUpload: File[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
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

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      minFindeksScore:["",Validators.required],
      carImage:[null]
    })  
  }

  onFileChange(event:any)  {
    if(event.target.files.length>0){
      this.files = [];
      for  (var i =  0; i <  event.target.files.length; i++)  { 
        if(event.target.files[i].type==="image/jpeg"){
          this.files.push(event.target.files[i]);
          this.fileToUpload[i] = event.target.files[i];
        }
        else{
          this.toastrService.error("Sadece resim dosyaları seçilmelidir.", "Hatalı işlem");
        }
      }
    }
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);

      this.addCar = {
        brandId: carModel.brandId,
        colorId: carModel.colorId,
        modelName: carModel.modelName,
        modelYear: carModel.modelYear,
        dailyPrice: carModel.dailyPrice,
        description: carModel.description,
        minFindeksScore: carModel.minFindeksScore
      };
      console.log(carModel);
      console.log(this.addCar);
      
      /*
      if(this.fileToUpload.length>0){
        
        this.addCarImage = {
          carId = 2,
          imagePath = this.fileToUpload
        }
        
        console.log(this.files);
        console.log(this.fileToUpload[0].name);
      }
      */

      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message,"Başarılı");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (responseError) => {
          console.log(responseError.error);
          if(responseError.error.ValidationErrors.length>0){
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
            }
          }
        }
      );

    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }
}
