import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { ProductCategory } from '../models/product-category';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private productCategoryCollection = collection(ConfigService.getFirestoreApp(), 'ProductCategory');

  constructor() { }

  async getProductCategories(): Promise<ProductCategory[]> {
    const productCategorySnapshot = await getDocs(this.productCategoryCollection);
    const productCategoryList = productCategorySnapshot.docs.map(doc => doc.data());
    return productCategoryList as ProductCategory[];
  }

}
