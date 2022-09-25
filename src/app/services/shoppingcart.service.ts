import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { Customer } from '../models/customer';
import { ConfigService } from './config.service';
import { async } from '@firebase/util';


const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  private shoppingCollection = collection( ConfigService.getFirestoreApp(), 'Shoppingcart');
  private static shoppingcart: [];

  constructor() {}

  async getShoppingCart() {
    if (!ShoppingcartService.shoppingcart) {
      // Traemos los productos que estaán en la DB
      const shoppingSnapshot = await getDocs(this.shoppingCollection);
      const shoppingcartList = shoppingSnapshot.docs.map(doc => ({id: doc?.id, ...doc?.data()}));
      // ProductService.products = productList as Product[];
    // }
    // return ProductService.products;
    }

  }

  async setProductToShoppingcart(dataShoppingcart) {
    await addDoc(this.shoppingCollection, dataShoppingcart)

  }
}
