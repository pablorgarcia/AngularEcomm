import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryCrudComponent } from 'src/app/components/product-category/product-category-crud/product-category-crud.component';
import { ProductCategoryListComponent } from 'src/app/components/product-category/product-category-list/product-category-list.component';
import { ProductCategoryComponent } from './product-category.component';

const routes: Routes = [
    {
      path: '',
      component: ProductCategoryComponent,
      children: [
      {
        path: '',
        component: ProductCategoryListComponent
      },
      {
        path: 'new',
        component: ProductCategoryCrudComponent
      }
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
