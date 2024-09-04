import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList:Product[],value:string): Product[] {
    return productList.filter((item)=>  {
   return item.title.toLowerCase().includes(value.toLowerCase())
  }) ;
  }

}
