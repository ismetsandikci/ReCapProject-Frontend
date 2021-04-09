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
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentaldetailComponent } from './components/rentaldetail/rentaldetail.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:LoginComponent},
  {path:"login", pathMatch:"full", component:LoginComponent},
  {path:"register", pathMatch:"full", component:RegisterComponent},

  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cardetails/:carId", component:CarDetailComponent},
  {path:"carupdate/:carId", component:CarUpdateComponent, canActivate:[LoginGuard]},

  {path:"customers", component:CustomerComponent, canActivate:[LoginGuard]},
  
  {path:"rentals", component:RentalComponent, canActivate:[LoginGuard]},
  {path:"rentaldetails/:rentalId", component:RentaldetailComponent, canActivate:[LoginGuard]},

  {path:"payments", component:PaymentComponent, canActivate:[LoginGuard]},

  {path:"brandList", component:BrandListComponent, canActivate:[LoginGuard]},

  {path:"colorList", component:ColorListComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorListComponent,canActivate:[LoginGuard]},

  {path:"userprofile", component:UserProfileComponent, canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
