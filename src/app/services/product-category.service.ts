import { Injectable } from '@angular/core';

import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { ConfigService } from './config.service';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';

import { ProductCategory } from '../models/product-category';

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private productCategoryCollection = collection(ConfigService.getFirestoreApp(), 'ProductCategory');

  constructor() { }

  async getProducts(): Promise<ProductCategory[]> {
    // Traemos los productos que estaán en la DB
    const productCategorySnapshot = await getDocs(this.productCategoryCollection);
    const productCategoryList = productCategorySnapshot.docs.map(doc => doc.data());
    return productCategoryList as ProductCategory[];
  }

  setProductCategory(product: ProductCategory) {
    // enviamos los productos creados en el formulario del product-crud a la DB
    addDoc(this.productCategoryCollection, product);
  }
}
