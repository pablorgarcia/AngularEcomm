import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';

import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

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

  public isAdmin = false;
  public user;
  public formProductQty: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly shoppingcartService: ShoppingcartService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params?.name;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getProductDetail();
    this.formProductQty = this.fb.group({
      productQty: [null, [Validators.required]]
    })
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

  addShoppingCard(product):void {
    const qty = this.formProductQty.value['productQty']
    const dataShoppingCart = {
      productName: product?.name,
      producId: this.productId,
      qty,
      userId: this.user.uid
    }
    this.shoppingcartService.setProductToShoppingcart(dataShoppingCart)
  }

}
