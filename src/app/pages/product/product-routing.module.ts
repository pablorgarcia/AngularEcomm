import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCrudComponent } from 'src/app/components/product/product-crud/product-crud.component';
import { ProductDetailComponent } from 'src/app/components/product/product-detail/product-detail.component';
import { ProductListComponent } from 'src/app/components/product/product-list/product-list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [{
      path: '',
      component: ProductListComponent
    },
    {
      path: 'new',
      component: ProductCrudComponent
    },
    {
      path: 'detail/:id',
      component: ProductDetailComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
