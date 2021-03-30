import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"cardetails/:carId", component:CarDetailComponent},
  {path:"carupdate/:carId", component:CarUpdateComponent},

  {path:"customers", component:CustomerComponent},
  
  {path:"rentals", component:RentalComponent},

  {path:"payments", component:PaymentComponent},

  {path:"brandList", component:BrandListComponent},

  {path:"colorList", component:ColorListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
