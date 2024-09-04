import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Data, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{
  isLoading:boolean=true;
  data!:any;
  constructor(private _CartService:CartService,private _AuthService:AuthService){}
  ngOnInit(): void {
    if(typeof localStorage !='undefined')
    {
      localStorage.setItem('currentPage','/Cart')
    }
this.getLoggedUserCart()
}

getLoggedUserCart()
{
  this.isLoading=true
  this._CartService.getLoggedUserCart().subscribe({

next:(res)=>{
  this.isLoading=false
  console.log("jcc")
console.log(res.data)
this.data=res.data
}  })
}
updateProductCartQuantity(_Id:string,count:number)
{

  if(count<=0){
    this.Removespecificcartitem(_Id)
  }
  else{
    this._CartService.updateProductCartQuantity(_Id,count.toString()).subscribe({
      next:(res)=>{
        console.log(res)
        this._AuthService.countcart.next(res.numOfCartItems);
        localStorage.setItem('cartcount',this._AuthService.countcart.getValue().toString())
        this.data=res.data
      }
    })
  }
}
Removespecificcartitem(product_id:string){
this._CartService.Removespecificcartitem(product_id).subscribe({
  next:(res)=>{
    console.log(res)
    this._AuthService.countcart.next(res.numOfCartItems)
    localStorage.setItem('cartcount',this._AuthService.countcart.getValue().toString())
    this.data=res.data
  }
})
}
}
