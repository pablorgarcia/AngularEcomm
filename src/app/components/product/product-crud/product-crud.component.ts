import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { FORM_PRODUCT } from 'src/app/services/constants/forms.constant';
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
    selected: Boolean;
  }[]

  private isEdit = false;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly productCategory: ProductCategoryService,
    private readonly route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.productForm = this.fb.group(FORM_PRODUCT);

    await this.getProductCategories();

    this.isEdit = Boolean(this.route.snapshot?.params?.id);

    if (this.isEdit) {
      const product = await this.productService.getProductDetail(this.route.snapshot?.params?.id);
      this.setForm(product);
    }
  }

  private async getProductCategories() {
    return this.productCategory.getProductCategories().then(data => {
      this.productCategoryOptions = data.map(d => ({
        value: d.id.toString(),
        name: d.name,
        selected: false
      }));
    })
  }

  private setForm(product: Product): void {
    const {
      image,
      name,
      description,
      sku,
      price,
      idProductCategory
    } = this.productForm.controls;

    name.setValue(product?.name);
    image.setValue(product?.image);
    description.setValue(product?.description);
    sku.setValue(product?.sku);
    price.setValue(product?.price);
    idProductCategory.setValue(product?.idProductCategory);

    const productOptionCategory = this.productCategoryOptions
      .find(({value}) => value === product?.idProductCategory);

      if (productOptionCategory) {
        productOptionCategory.selected = true;
      }
  }

  submitProduct() :void {
    // le pasamos al servicio los productos para enviarlos a la DB
    const product = this.productForm.value;
    if (!this.isEdit) {
      this.productService.setProduct(product);
    } else {
      this.productService.updateProduct(product);
    }

    this.router.navigate(['admin/product']);
    console.log('productos enviados a DB', product);
  }

}
