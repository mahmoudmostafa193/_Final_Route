import { category } from './../../../shared/interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatgeoryService } from '../../../shared/services/catgeory/catgeory.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss'
})
export class CategorysliderComponent implements OnInit {
  categoryList!:category[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
     
    },
    nav: true
  }
  isLoading:boolean=true;
constructor(private _CatgeoryService:CatgeoryService)
{
}
ngOnInit(): void {
  this.getAllCategory()
}
getAllCategory()
{
  this.isLoading=true;
  this._CatgeoryService.getAllCategories().subscribe({
    next:(res)=>{
      this.isLoading=false
      console.log("categoryslider")
console.log(res.data)
this.categoryList=res.data;
    }
  })
}
}
