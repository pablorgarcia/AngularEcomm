import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { COMPONENTS } from './components.constant';


@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
