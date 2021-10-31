import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCrudComponent } from './product/product-crud/product-crud.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCrudComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent,
    ProductCrudComponent
  ]
})
export class ComponentsModule { }
