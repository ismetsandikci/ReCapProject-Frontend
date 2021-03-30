import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  dataLoaded = false;
  brands : Brand[] = [];

  brandAddForm:FormGroup;
  selectedBrand:Brand;
  brandUpdateForm:FormGroup;
  
  constructor(
    private router:Router,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.getBrands();
    this.addCreateForm();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      this.dataLoaded = response.success;
    })
  }

  addCreateForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  addBrand(){
    if(this.brandAddForm.valid){
      let addBrandModel=Object.assign({},this.brandAddForm.value);
      this.brandService.add(addBrandModel).subscribe(
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
    else{
      this.toastrService.warning("Marka ismi boş olamaz","Ekleme Başarısız");
    }
  }

  setSelectedBrand(brand:Brand){
    this.selectedBrand=brand;
    this.updateCreateForm();
  }

  updateCreateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:[this.selectedBrand.brandId,Validators.required],
      brandName:["",Validators.required]
    })
  }

  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel=Object.assign({},this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
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
    else{
      this.toastrService.warning("Marka ismi boş olamaz","Güncelleme Başarısız");
    }
  }

  
}
