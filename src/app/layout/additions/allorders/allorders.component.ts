import { Component, OnInit } from '@angular/core';
import { Init } from 'v8';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserOrders } from '../../../shared/interfaces/user-orders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
 
constructor(private _OrderService:OrderService,private _AuthService:AuthService){
  if(typeof localStorage !='undefined')
    {
      localStorage.setItem('currentPage','/allorders')
    }
}
userId:string |null=''
allOrdersList:UserOrders[]=[]
ngOnInit(): void {
  this.userId=this._AuthService.userdata.id
  this._OrderService.getUsersOrders(this.userId).subscribe({
    next:(res)=>{
      console.log(res)
      this.allOrdersList=res
    }
  })
}
}
