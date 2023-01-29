import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPaymentMethodsComponent } from '../order-payment-methods/order-payment-methods.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPaymentMethodsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPaymentMethodsRoutingModule {}
