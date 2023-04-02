import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

import { subheaderData } from 'src/app/shared/components/subheader/subheader.interface';
import { ButtonData } from 'src/app/shared/components/button/button.interface';
import { Subscription } from 'rxjs';

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
  public isAdmin = false;

  private subs: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly location: Location
  ) { }

  async ngOnInit() {
    this.isAdmin = Boolean(window.location.href.includes('admin'));
    await this.getProductList();
    const sub = this.productService.products$.subscribe(products => this.products = products);
    this.subs.push(sub);
  }

  private getProductList() {
    this.productService.getProducts();
  }

  goToNewProduct(): void {
    this.router.navigate(['admin/product/new']);
  }

  goToProductDetail(name: string): void {
    name = name.split(' ').join('-');
    this.router.navigate([`${this.isAdmin ? 'admin/' : ''}product/detail/${name}`]);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
