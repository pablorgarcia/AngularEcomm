import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  public productForm: FormGroup;
  public productCategoryOptions: {
    name: string;
    value: string;
  }[]

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly productCategory: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      image: [''],
      name: [''],
      description: [''],
      sku: [''],
      price: 0,
      idProductCategory: ['', [Validators.required]]
    })

    this.getProductCategories();
  }

  private getProductCategories() {
    this.productCategory.getProductCategories().then(data => {
      this.productCategoryOptions = data.map(d => ({
        value: d.id.toString(),
        name: d.name
      }));
    })
  }

  submitProduct() :void {
    // le pasamos al servicio los productos para enviarlos a la DB
    const product = this.productForm.value;
    this.productService.setProduct(product);
    this.router.navigate(['admin/product']);
    console.log('productos enviados a DB', product);
  }

}
