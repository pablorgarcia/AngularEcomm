import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  goToNewProductCategory(): void {
    this.router.navigate(['admin/product-category'])
  }

}
