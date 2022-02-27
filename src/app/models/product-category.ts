export interface ProductCategory {
  // https://resources.fabric.inc/blog/ecommerce-data-model
  id: string;
  name: string;
  description: string;
  code: number;
  parentCode: number;
  created: Date;
}
