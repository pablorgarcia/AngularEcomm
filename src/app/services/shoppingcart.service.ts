import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { Customer } from '../models/customer';
import { ConfigService } from './config.service';
import { async } from '@firebase/util';
import { Observable, Subject } from 'rxjs';


const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  private shoppingCollection = collection( ConfigService.getFirestoreApp(), 'Shoppingcart');
  private static shoppingcart: any[];

  private shoppingcart$ = new Subject();
  onShoppingcart$ = new Observable();

  constructor() {
    // Inicializarlo el observable al que nos subscribimos
    this.onShoppingcart$ = this.shoppingcart$.asObservable();
  }

  async getShoppingCart() {
    if (!ShoppingcartService.shoppingcart) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      // Traemos los productos que estaán en la DB
      const shoppingSnapshot = await getDocs(this.shoppingCollection) as any;
      const shoppingcartList = shoppingSnapshot.docs
        .map(doc => ({id: doc?.id, ...doc?.data()}))
        .filter(({userId}) => userId === user.uid);
      ShoppingcartService.shoppingcart = shoppingcartList as [];
    }

    return ShoppingcartService.shoppingcart;
  }

  async setProductToShoppingcart(dataShoppingcart) {
    const product = ShoppingcartService.shoppingcart
      .find(data => data?.productId === dataShoppingcart?.productId);

    if (product) {
      const docShoppingcart = await ShoppingcartService.getShoppingCartDetail(product.id)
      await updateDoc(docShoppingcart, dataShoppingcart)
    } else {
      await addDoc(this.shoppingCollection, dataShoppingcart);
    }
    ShoppingcartService.shoppingcart = null;
    const shoppingcart = await this.getShoppingCart();
    // Devolvemos el dato al observable
    this.shoppingcart$.next(shoppingcart)
  }

  private static async getShoppingCartDetail(shoppingcartId) {
    return await doc(ConfigService.getFirestoreApp(), 'Shoppingcart', shoppingcartId)
  }
}
