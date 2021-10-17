export interface ProductCategory {
  // https://resources.fabric.inc/blog/ecommerce-data-model
  id: number;
  name: string;
  description: string;
  code: number;
  parentCode: number;
  created: Date;
}
