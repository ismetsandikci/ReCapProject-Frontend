import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Filters } from 'src/app/models/filters';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  
  dataLoaded = false;

  brands: Brand[] = [];

  currentBrand : Brand;
  allBrand?: Brand;
  Filters = {};

  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
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

  setCurrentBrand(){
    this.currentBrand !== undefined
      ? (Filters.brandId = this.currentBrand.brandId)
      : (Filters.brandId = null);
  } 
  
  allBrandSelected(){
    return this.currentBrand == undefined ? true : false;
  } 

}
