import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ButtonData } from 'src/app/shared/components/button/button.interface';

@Component({
  selector: 'app-product-category-crud',
  templateUrl: './product-category-crud.component.html',
  styleUrls: ['./product-category-crud.component.scss']
})
export class ProductCategoryCrudComponent implements OnInit {

  public productCategoryForm: UntypedFormGroup;

  public dataButton: ButtonData = {
    iconLeft: 'cloud_upload',
    text: 'Subir un producto'
  }

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.productCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      code: [0],
      parentCode: [],
      created: ['']
    });
  }

  submitForm(): void{
    console.log(this.productCategoryForm.value);
    this.productCategoryForm.value.created = new Date();
    this.productCategoryService.setProductCategory(this.productCategoryForm.value);
  }

}
