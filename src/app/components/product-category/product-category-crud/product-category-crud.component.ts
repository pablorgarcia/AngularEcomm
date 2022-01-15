import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-crud',
  templateUrl: './product-category-crud.component.html',
  styleUrls: ['./product-category-crud.component.scss']
})
export class ProductCategoryCrudComponent implements OnInit {

  public productCategoryForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.productCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      code: [0],
      parentCode: [0],
      created: ['']
    });
  }

  submitForm(): void{
    console.log(this.productCategoryForm.value);
    this.productCategoryForm.value.created = new Date();
    this.productCategoryService.setProductCategory(this.productCategoryForm.value);
  }

}
