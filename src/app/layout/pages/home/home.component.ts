import { withFetch } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from '../../additions/categoryslider/categoryslider.component';
import { HomesliderComponent } from '../../additions/homeslider/homeslider.component';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    SearchPipe,
    CategorysliderComponent,
    DatePipe,
    HomesliderComponent,
    RouterLink,
    UpperCasePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userWord: string = '';
  date = new Date();
  x!: Product[];
  isLoading: boolean = true;
  wishlist:string[]=[];
  constructor(
    private toastr: ToastrService,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
    ,private _AuthService:AuthService
  ) {}
  ngOnInit(): void {
    this.getLoggedUserWishlist()
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/Home');
    }
    this.getAllProduct();
  }
  getAllProduct() {
    this.isLoading = true;
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        console.log('producthome');
        console.log(res.data);
        this.x = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
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
        this._AuthService.countcart.next(res.numOfCartItems) 
        this.toastr.success('Remove From Wish List', '', {
          progressBar: true,
          timeOut: 7500,
          positionClass: 'toast-bottom-right',
        });
      }
    })

  
  }
  getLoggedUserWishlist()
  {
    this._WishlistService.getLoggedUserWishList().subscribe(
      {
        next : (res)=>
        {
const newData=res.data.map((item:any)=>item._id)
this.wishlist=newData
        }
      }
    )
  }

}
