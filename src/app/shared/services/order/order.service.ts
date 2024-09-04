import { address } from './../../interfaces/data';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient
  ) { }
  userTokenHeader = { token: localStorage.getItem('userToken') || '' };
    checkOut(_id:string,data:address):Observable<any>
    {
    return  this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/orders/checkout-session/${_id}?url=${Enviroment.baseURLWebsite}`,{
        shippingAddress:data
      },{headers:this.userTokenHeader})
    }
    getUsersOrders(id:string | null):Observable<any>
    {
    return  this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/orders/user/${id}`)
    }
}
