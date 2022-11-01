import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingcartRoutingModule } from './shoppingcart-routing.module';
import { ShoppingcartComponent } from './shoppingcart.component';

@NgModule({
  declarations: [
    ShoppingcartComponent
  ],
  imports: [
    CommonModule,
    ShoppingcartRoutingModule
  ]
})
export class ShoppingcartModule { }
