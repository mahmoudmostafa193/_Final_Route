import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { RouterLink } from '@angular/router';
import { Brands } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  isLoading: boolean = true;

  brandListTwo!: Brands[];
  constructor(private _BrandsService: BrandsService) {}
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('current page', '/Brands');
    }
    this.getAllBrands();
  }
  brandsLisst!: Brands[];

  getAllBrands() {
    this.isLoading = true;
    this._BrandsService.getAllbrands().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.brandsLisst = res.data;
        console.log(this.brandsLisst);
      },
    });
  }
  alret: boolean = true;
  alretTitle: boolean = true;

  modalImg: string = '';
  textImg: string = '';
  hideModal(eleTarget: EventTarget | null, imgRef: HTMLImageElement): void {
    if (eleTarget == imgRef) return;
    else {
      this.alret = true;
    }
  }
}
