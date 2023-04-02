import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { MENU_ADMIN, MENU_CUSTOMER, MENU_GLOBAL } from '../../../services/constants/menu.constant';
import { UserService } from '../../../services/user.service';
import { i18nService } from '../../../services/i18n.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogged = false;
  public menu = [];
  private hasShoppingcartProducts = false;

  public langs: string[];

  constructor(
    private userService: UserService,
    private shoppingcartService: ShoppingcartService,
    private readonly i18nService: i18nService
    ) { }

  async ngOnInit() {
    this.i18nService.getLang();
    this.langs = this.i18nService.getLangs()
    this.menu = MENU_GLOBAL;
    this.userService.user$.subscribe(user => {
      this.isLogged = Boolean(user);
      if (!user) {
        this.menu = MENU_GLOBAL;
        return;
      }
      if (user && !user['isCustomer']) {
        this.menu = [...MENU_ADMIN, ...this.menu];
      }
      if (user['isCustomer']) {
        this.menu = [...MENU_CUSTOMER, ...this.menu];
      }
    });

    const shoppingcart = await this.shoppingcartService.getShoppingCart();
    if(shoppingcart?.length) {
      this.setShoppingCartMenu();
    }

    this.shoppingcartService.onShoppingcart$.subscribe(shoppingcart => {
      if(!this.hasShoppingcartProducts){
        this.setShoppingCartMenu();
      }
    })
  }

  onChangLang(lang: string): void {
    this.i18nService.setLang(lang)
  }

  private setShoppingCartMenu(): void {
    this.menu = [...this.menu, {
      name: 'shoppingcart',
      url: '/shoppingcart'
    }]
    this.hasShoppingcartProducts = true;
  }

  logout(): void {
    this.userService.logout();
  }

}
