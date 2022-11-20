import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { UserService } from './user.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCollection = collection( ConfigService.getFirestoreApp(), 'Order');
  private static orders: any[];

  constructor(
    private readonly userService: UserService
  ) { }


  async getOrder() {
    if (!OrderService.orders) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      // Traemos los productos que estaán en la DB
      const orderSnapshot = await getDocs(this.orderCollection) as any;
      const orderList = orderSnapshot.docs
        .map(doc => ({id: doc?.id, ...doc?.data()}))
        .filter(({userId}) => userId === user.uid);
        OrderService.orders = orderList as [];
    }

    return OrderService.orders;
  }

  async setOrder(order) {
    const user = this.userService.getUser();
    order.userId = user?.uid;
    await addDoc(this.orderCollection, order);
    OrderService.clearOrders();
  }

  private static clearOrders() {
    OrderService.orders = null;
  }


}
