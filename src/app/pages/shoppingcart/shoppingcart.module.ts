import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingcartRoutingModule } from './shoppingcart-routing.module';
import { ShoppingcartComponent } from './shoppingcart.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ShoppingcartComponent
  ],
  imports: [
    CommonModule,
    ShoppingcartRoutingModule,
    SharedModule
  ]
})
export class ShoppingcartModule { }
