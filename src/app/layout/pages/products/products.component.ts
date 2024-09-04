import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports:  [FormsModule,SearchPipe,RouterLink,UpperCasePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
userWord:string='';
  date=new Date();
  x!: Product[];
  isLoading:boolean=true;
  constructor(private _ProductService: ProductService) {}
  ngOnInit(): void {
    if(typeof localStorage !='undefined')
      {
        localStorage.setItem('currentPage','/Products')
      }
  
    this.getAllProduct();
  }
  getAllProduct() {
    this.isLoading=true;
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        console.log('producthome');
        console.log(res.data);
        this.x = res.data;
        this.isLoading=false
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false
      },
    });
  }


}