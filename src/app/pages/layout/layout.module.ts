import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { i18nService } from '../../services/i18n.service';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule.forChild()
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    i18nService
  ]
})
export class LayoutModule { }
