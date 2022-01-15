import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private readonly router: Router,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList() {
    this.productService.getProducts().then(data => {
      this.products = data;
    });
  }

  goToNewProduct(): void {
    this.router.navigate(['admin/product/new']);
  }

}
