import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Product } from '../models/product';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection = collection(ConfigService.getFirestoreApp(), 'Product');

  constructor() { }

  async getProducts(): Promise<Product[]> {
    const productSnapshot = await getDocs(this.productCollection);
    const productList = productSnapshot.docs.map(doc => doc.data());
    return productList as Product[];
  }

}
