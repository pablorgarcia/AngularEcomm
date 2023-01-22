import { Component, OnInit } from '@angular/core';
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

  constructor(
    private readonly shoppingcartService: ShoppingcartService,
    private readonly customerAddressService: CustomerAddressService,
    private readonly orderService: OrderService
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

    await this.orderService.setOrder(order);
  }

  private async getCustomerAddressees() {
    await this.customerAddressService.getCustomerAddress()
      .then(addresses => this.customerAddresses = addresses)
  }

  public saveBillingAdress(event) {
    console.log(event)
  }

  setBillingAddress(): void {
    this.isSameCustomAddress = !this.isSameCustomAddress;
    if (this.isSameCustomAddress) {
      const billingAddress = JSON.parse(JSON.stringify(this.orderAddress));
      delete billingAddress.id;
      delete billingAddress.name;
      delete billingAddress.favourite;
      this.customerAddressService.setCustomerBillingAddress(billingAddress);
    }

  }

}
