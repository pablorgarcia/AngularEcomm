import { Component, Input, OnInit } from '@angular/core';
import { PriceData } from './price.interface';

@Component({
  selector: 'div[app-price]',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  host: {
    '[class.price]': 'null'
  },
  inputs: ['data']
})
export class PriceComponent implements OnInit {

  @Input() data: PriceData;

  constructor() { }

  ngOnInit(): void {
  }

}
