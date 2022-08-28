import { Component, OnInit } from '@angular/core';
import { MENU_ADMIN, MENU_CUSTOMER, MENU_GLOBAL } from '../../../services/constants/menu.constant';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged = false;0
  menu = [];

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
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
  }

  logout(): void {
    this.userService.logout();
  }

}
