import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {

  public productCategories: ProductCategory[] = [];

  constructor(
    private readonly router: Router,
    private readonly productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.getProductCategoryList()
  }

  private getProductCategoryList() {
    this.productCategoryService.getProductCategories()
      .then(categories => this.productCategories = categories)
  }

  goToNewProductCategory(): void {
    this.router.navigate(['admin/product-category/new'])
  }

}
