import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonData } from '../button/button.interface';
import { subheaderData } from './subheader.interface';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {

  @Input() data: subheaderData;
  @Output() onBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataButton: ButtonData = {
    iconLeft: 'arrow_back_ios',
    text: 'volver'
  }

  constructor() {}

  ngOnInit(): void {}

  goBack(): void {
    this.onBack.emit(true);
  }

}
