export interface Product {
  // https://resources.fabric.inc/blog/ecommerce-data-model
  id: number;
  img: string;
  name: string;
  description: string;
  sku: string; // codigo de barras
  price: number;
  idVendor: number;
  idCategory: number;
  created: Date;
}
