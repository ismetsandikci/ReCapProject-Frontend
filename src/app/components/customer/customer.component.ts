import { Component, OnInit } from '@angular/core';
import { CustomerDto } from 'src/app/models/customerDto';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  dataLoaded = false;
  customersDetails: CustomerDto[] = [];

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomersDetails();
  }

  getCustomersDetails() {
    this.customerService.getCustomersDetails().subscribe(response=>{
      this.customersDetails = response.data;
      this.dataLoaded = response.success;
    })
  }
}
