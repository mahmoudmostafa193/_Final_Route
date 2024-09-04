import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { Brands, DataBrand } from '../../interfaces/brands';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllbrands():Observable<Brands>
  {
   return this._HttpClient.get<Brands>(`${Enviroment.baseUrl}/api/v1/brands`)
  }
  getSpecificBrand(id:string):Observable<DataBrand>
  {
     return this._HttpClient.get<DataBrand>(`${Enviroment.baseUrl}/api/v1/brands/${id}`)
  }
}
