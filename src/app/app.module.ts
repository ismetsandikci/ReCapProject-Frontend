import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarComponent } from './components/car/car.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/nav/nav.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentaldetailComponent } from './components/rentaldetail/rentaldetail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    SidebarComponent,
    NavComponent,
    CustomerComponent,
    RentalComponent,
    BrandComponent,
    ColorComponent,
    CarDetailComponent,
    CarFilterPipePipe,
    PaymentComponent,
    FooterComponent,
    CarAddComponent,
    BrandListComponent,
    ColorListComponent,
    CarUpdateComponent,
    LoginComponent,
    UserProfileComponent,
    CustomerProfileComponent,
    RegisterComponent,
    RentaldetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
