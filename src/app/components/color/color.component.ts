import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  dataLoaded = false;
  colors: Color[] = [];
  currentColor : Color | null;

  constructor(
    private colorService:ColorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
      this.dataLoaded = true;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
    this.router.navigate(['cars/'], { queryParams: { colorId: this.currentColor.colorId }, queryParamsHandling: 'merge'});
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'checked';
    } else {
      return null;
    }
  }

  getAllColorClass(){
    if(!this.currentColor){
      return 'checked';
    } else {
      return null;
    }
  }

  clearCurrentColor(){
    this.currentColor = null;
    this.router.navigate(['cars/'], { queryParams: { colorId: undefined }, queryParamsHandling: 'merge'});
  }
}
