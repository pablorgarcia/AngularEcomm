import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { Product } from '../models/product';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Almacenamos los productos de la DB
  private productCollection = collection(ConfigService.getFirestoreApp(), 'Product');

  constructor() {}

  async getProducts(): Promise<Product[]> {
    // Traemos los productos que estaán en la DB
    const productSnapshot = await getDocs(this.productCollection);
    const productList = productSnapshot.docs.map(doc => doc.data());
    return productList as Product[];
  }

  setProduct(product: Product) {
    // enviamos los productos creados en el formulario del product-crud a la DB
    addDoc(this.productCollection, product);
  }

}
