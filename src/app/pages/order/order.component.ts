import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAddressService } from '../../services/customer-address.service';
import { OrderService } from '../../services/order.service';
import { ShoppingcartService } from '../../services/shoppingcart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public productsOnShoppingcart: any = [];
  public totalAmount = 0;

  public customerAddresses = [];

  public orderAddress;

  public isSameCustomAddress: boolean = false;

  public customerBillingAddress: any;

  public isAddress: boolean = true;

  constructor(
    private readonly shoppingcartService: ShoppingcartService,
    private readonly customerAddressService: CustomerAddressService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  async ngOnInit() {
    await this.shoppingcartService.getShoppingCart()
      .then(products => {
        this.productsOnShoppingcart = products;
        let totalAmount = 0;
        products.map(product => totalAmount = (product?.price * product?.qty) + totalAmount)
        this.totalAmount = totalAmount;
      });
    await this.getCustomerAddressees();

  }

  async saveAddress(addressValue) {
    await this.customerAddressService.setCustomerAddress(addressValue);
    await this.getCustomerAddressees();
  }

  setOrderAddress(address): void {
    this.orderAddress = address;
  }

  async nextOrderStep() {
    const order = {
      localId: new Date().getTime(),
      total: this.totalAmount.toFixed(2),
      orderCurrency: '€',
      orderLines: this.productsOnShoppingcart.map(shoppingcartLine => ({orderLine: shoppingcartLine?.id})),
      orderAddress: this.orderAddress?.id,
      orderCreated: new Date().getTime()
    }

    sessionStorage.setItem('order', JSON.stringify({'orderLocalId': order.localId}))
    this.customerAddressService.setCustomerBillingAddress(this.customerBillingAddress);
    await this.orderService.setOrder(order);
    this.isAddress = false;
    this.router.navigateByUrl('/order/payment-methods');
  }

  private async getCustomerAddressees() {
    await this.customerAddressService.getCustomerAddress()
      .then(addresses => this.customerAddresses = addresses)
  }

  public saveCustomerBillingAddress(billingAddress) {
    if (billingAddress) {
      billingAddress.userId = this.userService.getUser().userId;
      delete billingAddress.name;
      delete billingAddress.favourite;
    }
    this.customerBillingAddress = billingAddress;
  }

  setBillingAddress(): void {
    this.isSameCustomAddress = !this.isSameCustomAddress;
    let billingAddress: any = null;
    if (this.isSameCustomAddress) {
      billingAddress = JSON.parse(JSON.stringify(this.orderAddress));
      delete billingAddress?.id;
    }
    this.saveCustomerBillingAddress(billingAddress);
  }

  addCustomerAddress() {
    console.log('')
  }

}
