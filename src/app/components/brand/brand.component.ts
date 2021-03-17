import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  
  dataLoaded = false;
  brands: Brand[] = [];
  currentBrand : Brand | null;

  constructor(
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    this.router.navigate(['cars/'], { queryParams: { brandId: this.currentBrand.brandId }, queryParamsHandling: 'merge'});
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'checked';
    } else {
      return null;
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return 'checked';
    } else {
      return null;
    }
  }

  clearCurrentBrand(){
    this.currentBrand = null;
    this.router.navigate(['cars/'], { queryParams: { brandId: undefined }, queryParamsHandling: 'merge'});
  }
}
