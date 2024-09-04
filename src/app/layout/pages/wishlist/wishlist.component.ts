import { CartService } from './../../../shared/services/cart.service';
import { Data } from './../../../shared/interfaces/cart';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Observable } from 'rxjs';
import { UpperCasePipe } from '@angular/common';
import { Product } from '../../../shared/interfaces/product';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [UpperCasePipe],

  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  isLoading:boolean=true
  wishlist:string[]=[];
  x!: Product[];
  constructor(private _WishlistService:WishlistService,private _CartService: CartService,   private toastr: ToastrService){}
  ngOnInit(): void {
    if(typeof localStorage !='undefined')
    {
      localStorage.setItem('currentPage','/Wish list')
    }

    this.getLoggedUserWish()

    }

data:any;

   
    addProductToCart(productId: string) {
      this._CartService.addProductToCart(productId).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Succes Add To Cart', '', {
            progressBar: true,
            timeOut: 7500,
            positionClass: 'toast-bottom-right',
          });
        },
      });
    }
    addProductToWishlist(_id: string) {
      this._WishlistService.addProductToWishlist(_id).subscribe({
        next: (res) => {
          console.log(res);
          this.wishlist=res.data
          this.toastr.success('Succes Add To Wish List', '', {
            progressBar: true,
            timeOut: 7500,
            positionClass: 'toast-bottom-right',
          });
        },
      });
    }
    removeProductFromWish(_id:string)
    {
      this._WishlistService.removeProductFromWishList(_id).subscribe({
        next:(res)=>{
          this.wishlist=res.data
          console.log(res)
        const newProductsData=this.x.filter((item:any)=> this.wishlist.includes(item._id))
        this.x=newProductsData
          this.toastr.success('Remove From Wish List', '', {
            progressBar: true,
            timeOut: 7500,
            positionClass: 'toast-bottom-right',
          });
        }
      })
  
    
    }
    getLoggedUserWish()
    {
      this.isLoading=true
      this._WishlistService.getLoggedUserWishList().subscribe(
        {
          next : (res)=>
          {
            this.isLoading=false
  const newData=res.data.map((item:any)=>item._id)
  this.wishlist=newData
  this.x=res.data
          }
        }
      )
    }
}
