import { Component, OnInit } from '@angular/core';
import { CustomerAddressService } from '../../services/customer-address.service';
import { ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public productsOnShoppingcart: any = [];
  public totalAmount = 0;

  public customerAddresses = [];

  constructor(
    private readonly shoppingcartService: ShoppingcartService,
    private readonly customerAddressService: CustomerAddressService
  ) { }

  async ngOnInit() {
    await this.shoppingcartService.getShoppingCart()
      .then(products => {
        this.productsOnShoppingcart = products;
        let totalAmount = 0;
        products.map(product => totalAmount = (product?.price * product?.qty) + totalAmount)
        this.totalAmount = totalAmount;
      });
    await this.customerAddressService.getCustomerAddress()
      .then(address => this.customerAddresses = address)
  }

  saveAddress(addressVlaue) {

  }

}
