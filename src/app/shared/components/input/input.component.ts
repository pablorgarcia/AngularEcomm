import { Component, Input, OnInit } from '@angular/core';
import { InputData } from './input.interface';

@Component({
  selector: 'input[app-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    '[attr.placeholder]': 'data.placeholder',
    '[attr.disabled]': 'data.disabled || null',
    '[class.input-disabled]': 'data.disabled || null'
  },
  inputs: ['data']
})
export class InputComponent implements OnInit {

  @Input() data: InputData;

  constructor() { }

  ngOnInit(): void {
  }

}
