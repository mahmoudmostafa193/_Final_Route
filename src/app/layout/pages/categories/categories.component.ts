import { Component } from '@angular/core';
import { CatgeoryService } from '../../../shared/services/catgeory/catgeory.service';
import { category, categoryRes } from '../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  isLoading: boolean = true;
  category!: category[];
  constructor(private _CatgeoryService: CatgeoryService) {}
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/Catergories');
    }
    this.getAllCategories();
  }
  getAllCategories() {
    this.isLoading = true;
    this._CatgeoryService.getAllCategories().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res.data);
        this.category = res.data;
      },
    });
  }
}
