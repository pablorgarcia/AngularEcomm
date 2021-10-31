import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];
  constructor(
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  private getProductsList() {
    this.productService.getProducts().then(data => {
      this.products = data;
    });
  }
}
