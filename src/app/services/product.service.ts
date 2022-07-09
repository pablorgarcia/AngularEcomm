import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { Product } from '../models/product';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Almacenamos los productos de la DB
  private productCollection = collection(ConfigService.getFirestoreApp(), 'Product');

  // consumimos menos memoria con el static
  private static products: Product[];

  constructor() {}

  async getProducts(): Promise<Product[]> {
    if (!ProductService.products) {
      // Traemos los productos que estaán en la DB
      const productSnapshot = await getDocs(this.productCollection);
      const productList = productSnapshot.docs.map(doc => ({id: doc?.id, ...doc?.data()}));
      ProductService.products = productList as Product[];
    }
    return ProductService.products;
  }

  async getProductDetail(name: string): Promise<Product> {
    name = name.split('-').join(' ');
    const products = ProductService.products ? ProductService.products : await this.getProducts();
    return products.find(product => product.name === name);
  };

  async setProduct(product: Product) {
    // enviamos los productos creados en el formulario del product-crud a la DB
    await addDoc(this.productCollection, product);
    ProductService.clearProducts();
  }


  async updateProduct(productId: string, product) {
    const data = await ProductService.getProducts(productId);
    await updateDoc(data, product);
    ProductService.clearProducts();
  }

  async deleteProduct(productId: string) {
    const data =await ProductService.getProducts(productId);
    await deleteDoc(data);
    ProductService.clearProducts();
  }

  private static async getProducts(productId) {
    return await doc(ConfigService.getFirestoreApp(), 'Product', productId);
  }

  private static clearProducts() {
    ProductService.products = null;
  }

}
