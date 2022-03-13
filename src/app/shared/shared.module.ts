import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED } from './shared.constant';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: SHARED,
  exports: SHARED,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModule { }
