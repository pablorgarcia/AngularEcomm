export interface Product {
  // https://resources.fabric.inc/blog/ecommerce-data-model
  id: string;
  image: string;
  name: string;
  description: string;
  sku: string; // codigo de barras
  price: number;
  idVendor: string;
  idProductCategory: string;
  idCurrency: string;
  created: Date;
}
