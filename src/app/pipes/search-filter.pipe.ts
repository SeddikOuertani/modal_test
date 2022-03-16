import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(cars : Car[], term : string): Car[] {
    if(term === ""){
      return cars;
    }else{
        return cars.filter(
          car=>{
            return car.getBrand().toUpperCase().includes(term.toUpperCase())
              || car.getModel().toUpperCase().includes(term.toUpperCase())
              || car.getMileage().toString().includes(term)
          }
        )
      }
  }

}
