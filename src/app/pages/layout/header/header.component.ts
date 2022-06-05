import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged = false;

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isLogged = Boolean(user);
    });
  }

  logout(): void {
    this.userService.logout();
  }

}
