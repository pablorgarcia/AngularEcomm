import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

import { subheaderData } from 'src/app/shared/components/subheader/subheader.interface';
import { ButtonData } from 'src/app/shared/components/button/button.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[] = [];
  public dataSubheader: subheaderData = {
    hasBack: true,
    title: 'Product List'
  }
  public dataButton: ButtonData = {
    iconLeft: 'add',
    text: 'Crear producto'
  }

  constructor(
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly location: Location
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

  goToProductDetail(name: string): void {
    name = name.split(' ').join('-');
    this.router.navigate([`admin/product/detail/${name}`]);
  }

  goBack(): void {
    this.location.back();
  }

}
