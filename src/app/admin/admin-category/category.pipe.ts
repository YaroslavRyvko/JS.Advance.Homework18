import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from 'src/app/interfaces/admin.interface';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(catArray: Array<ICategory>, value: any): Array<ICategory> {
    if (!value) {
      return catArray;
    }
    return catArray.filter(
      cat => cat.name.toLowerCase().includes(value.toLowerCase()))
    }
  }