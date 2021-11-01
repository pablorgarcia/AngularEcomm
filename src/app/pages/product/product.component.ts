import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/productCategory.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: Product[] = [];
  public productCategory: ProductCategory[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.getProductsList();
    this.getProductCategories();
  }

  private getProductsList() {
    this.productService.getProducts().then(data => {
      this.products = data;
    });
  }

  private getProductCategories() {
    this.productCategoryService.getProductCategories().then(data => {
      this.productCategory = data;
    });
  }
}
