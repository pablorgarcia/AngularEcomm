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

  private productCategories: ProductCategory[];

  constructor() { }

  async getProductCategories(): Promise<ProductCategory[]> {
    if (!this.productCategories) {
      const productCategorySnapshot = await getDocs(this.productCategoryCollection);
      const productCategoryList = productCategorySnapshot.docs
       .map(doc => ({id: doc?.id, ...doc?.data()}));
       this.productCategories = productCategoryList as ProductCategory[];
    }
    return this.productCategories;
  }

  async getProductCategoryDetail(id: string): Promise<ProductCategory> {
    const categories = this.productCategories ? this.productCategories : await this.getProductCategories()
    return categories.find(category => category.id === id)
  }

  setProductCategory(product: ProductCategory) {
    // enviamos los productos creados en el formulario del product-crud a la DB
    addDoc(this.productCategoryCollection, product);
  }

}
