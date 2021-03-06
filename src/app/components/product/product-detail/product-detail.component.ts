import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';

import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

import { PriceData } from 'src/app/shared/components/price/price.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private productId: string;
  public product: Product;
  public productCategory: ProductCategory;

  public dataPrice: PriceData = {
    price: 'precio actual'
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params?.name;
    this.getProductDetail();
  }

  getProductDetail(): void {
    this.productService.getProductDetail(this.productId)
      .then(product => {
        this.product = product;
        this.getProductCategory(product?.idProductCategory)
      })
  }

  getProductCategory(categoryId: string): void {
    this.productCategoryService.getProductCategoryDetail(categoryId)
      .then(category => this.productCategory = category)
  }

  goToEdit(): void {
    this.router.navigate([`/admin/product/edit/${this.productId}`]);
  }

  async delete() {
    await this.productService.deleteProduct(this.productId);
    this.router.navigate(['/admin/product']);
  }

}
