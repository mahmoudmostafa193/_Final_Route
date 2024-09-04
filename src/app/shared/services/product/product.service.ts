import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Product, ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) {}
  getAllProducts(): Observable<ProductRes> {
    return this._HttpClient.get<ProductRes>(
      `${Enviroment.baseUrl}/api/v1/products`
    );
  }
  getProductById(_id:string):Observable<{data:Product}>
  {
    return this._HttpClient.get<{data:Product}>(`${Enviroment.baseUrl}/api/v1/products/${_id}`)
  }
}
