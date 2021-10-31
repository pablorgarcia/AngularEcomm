export interface Product {
  // https://resources.fabric.inc/blog/ecommerce-data-model
  id: number;
  image: string;
  name: string;
  description: string;
  sku: string; // codigo de barras
  price: number;
  idVendor: number;
  idProductCategory: number;
  idCurrency: number;
  created: Date;
}
