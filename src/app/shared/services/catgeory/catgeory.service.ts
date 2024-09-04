import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { categoryRes } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CatgeoryService {

  constructor(private _HttpClient:HttpClient) { }
  getAllCategories():Observable<categoryRes>
  {
   return this._HttpClient.get<categoryRes>(`${Enviroment.baseUrl}/api/v1/categories`);
  }
  getSpecificCategories(_id:string | null):Observable<any>
  {
   return this._HttpClient.get<any>(`${Enviroment.baseUrl}/api/v1/categories/${_id}`);
  }
}
