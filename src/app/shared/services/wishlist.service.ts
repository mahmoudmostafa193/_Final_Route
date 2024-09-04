import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../base/Enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userTokenHeader = { token: localStorage.getItem('userToken') || '' };
  constructor(private _HttpClient:HttpClient) { }
  addProductToWishlist(_ID:string):Observable<any>
  {
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/wishlist`,{productId:_ID},{headers:this.userTokenHeader})
  }
  getLoggedUserWishList():Observable<any>
  {
    return this._HttpClient.get<any>(`${Enviroment.baseUrl}/api/v1/wishlist`,{headers:this.userTokenHeader})
  }
  removeProductFromWishList(_id:string):Observable<any>
  {
return this._HttpClient.delete(`${Enviroment.baseUrl}/api/v1/wishlist/${_id}`,{headers:this.userTokenHeader})
  }
}
