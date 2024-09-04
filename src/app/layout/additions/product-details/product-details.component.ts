import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!:Product;
 isLoading:boolean=true;


constructor(private _ProductService:ProductService,    private toastr: ToastrService,private _ActivatedRoute:ActivatedRoute,private _AuthService:AuthService,private _CartService:CartService)
{}

ngOnInit(): void {
  this.getProductById()

}

getProductById()
{
  this.isLoading=true
let id:string='';
  this._ActivatedRoute.params.subscribe(
    {
      next(value) {
        console.log(value['id'])
       id=value['id'];
      },
    }
  )
this._ProductService.getProductById(id).subscribe({
  next: (res) =>
  {
    this.isLoading=false
    console.log('h')
    console.log(res.data)
    this.product=res.data
  }
})
}


addProductToCart(productId: string) {
  this._CartService.addProductToCart(productId).subscribe({
    next: (res) => {
      console.log(res);
      this._AuthService.countcart.next(res.numOfCartItems)
      localStorage.setItem('cartcount',this._AuthService.countcart.getValue().toString())
      console.log('number',this._AuthService.countcart.getValue())
      this.toastr.success('Succes Add To Cart', '', {
        progressBar: true,
        timeOut: 7500,
        positionClass: 'toast-bottom-right',
      });
    },
  });
}
}
