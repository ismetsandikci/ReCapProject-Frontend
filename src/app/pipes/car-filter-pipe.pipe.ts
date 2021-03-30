import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: CarDto[], filterText:string): CarDto[] {
    filterText = filterText.length>2? filterText.toLocaleLowerCase() : "";

    return filterText? value.filter((c:CarDto)=>
    c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    c.modelName.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1 ):value;
  }

}
