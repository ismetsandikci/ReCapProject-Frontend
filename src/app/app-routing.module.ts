import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'car',
    component: CarComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'rental',
    component: RentalComponent,
  },
  {
    path: 'brand',
    component: BrandComponent,
  },
  {
    path: 'color',
    component: ColorComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
