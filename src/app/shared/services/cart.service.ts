import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../base/Enviroment';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { LoggedCart } from '../interfaces/cart-logged';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userTokenHeader = { token: localStorage.getItem('userToken') || '' };
  constructor(private _HttpClient: HttpClient) {}
  addProductToCart(productId: string): Observable<Cart> {
    return this._HttpClient.post<Cart>(
      `${Enviroment.baseUrl}/api/v1/cart`,
      { productId: productId },
      {
        headers: this.userTokenHeader,
      }
    );
  }
  getLoggedUserCart(): Observable<LoggedCart> {
    return this._HttpClient.get<LoggedCart>(
      `${Enviroment.baseUrl}/api/v1/cart`,
      {
        headers: this.userTokenHeader,
      }
    );
  }
  updateProductCartQuantity(_Id:string,count:string):Observable<LoggedCart>
  {
    return this._HttpClient.put<LoggedCart>(`${Enviroment.baseUrl}/api/v1/cart/${_Id}`,{count:count},{headers:this.userTokenHeader})
  }
  Removespecificcartitem(_Id:string):Observable<LoggedCart>
  {
    return this._HttpClient.delete<LoggedCart>(`${Enviroment.baseUrl}/api/v1/cart/${_Id}`,{headers:this.userTokenHeader})
  }
}
