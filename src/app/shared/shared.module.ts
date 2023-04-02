import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED } from './shared.constant';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: SHARED,
  exports: SHARED,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class SharedModule { }
