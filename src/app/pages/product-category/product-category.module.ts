import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    ComponentsModule
  ]
})
export class ProductCategoryModule { }
