import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../../services/shoppingcart.service';
import { ProductService } from '../../services/product.service'


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  public productsOnShoppingcart: any = [];
  public isLoadding = false;

  constructor(
    private readonly shoppingcartService: ShoppingcartService,
    private readonly productService: ProductService
  ) { }

  async ngOnInit() {
    await this.shoppingcartService.getShoppingCart()
      .then(products => this.productsOnShoppingcart = products);

    this.productsOnShoppingcart.map(async product =>
      await this.productService.getProductDetail(product.productName).then(productDetail =>
        product.price = productDetail.price)
    )
  }

  addProduct(product) {
    product.qty++;
    this.updateProductLine(product);
  }

  removeProduct(product) {
    if(product.qty > 0) {
      product.qty--;
      this.updateProductLine(product);
    }
  }

  private updateProductLine(product) {
    this.isLoadding = true;
    this.shoppingcartService.setProductToShoppingcart(product).then(() => this.isLoadding = false);
  }

}
