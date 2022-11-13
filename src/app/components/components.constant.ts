import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCrudComponent } from './product/product-crud/product-crud.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCategoryListComponent } from './product-category/product-category-list/product-category-list.component';
import { ProductCategoryCrudComponent } from './product-category/product-category-crud/product-category-crud.component';
import { UserCrudComponent } from './user/user-crud/user-crud.component';
import { RegisterCustomerComponent } from './account/register-customer/register-customer.component';
import { FormUserAddressComponent } from './user/forms/form-user-address/form-user-address.component';

const COMPONENTS = [
  // Product
  ProductListComponent,
  ProductCrudComponent,
  // ProductDetail
  ProductDetailComponent,
  ProductCategoryListComponent,
  ProductCategoryCrudComponent,
  // USER
  UserCrudComponent,
  FormUserAddressComponent,
  // Account
  RegisterCustomerComponent
];

export { COMPONENTS }
