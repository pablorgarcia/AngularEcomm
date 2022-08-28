import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product',
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('../product-category/product-category.module').then(m => m.ProductCategoryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
