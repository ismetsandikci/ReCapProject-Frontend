import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentaldtoService } from 'src/app/services/rentaldto.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded = false;
  rentals: RentalDto[] = [];

  constructor(private rentalDtoService:RentaldtoService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalDtoService.getRentals().subscribe(response=>{
      this.rentals = response.data
      this.dataLoaded = response.success;
      console.log(this.rentals);
    })
  }
}
