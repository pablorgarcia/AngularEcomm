import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  public productForm: FormGroup;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      image: [''],
      name: [''],
      description: [''],
      sku: [''],
      price: 0,
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
