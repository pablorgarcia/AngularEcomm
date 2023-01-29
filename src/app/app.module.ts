import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './pages/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './pages/login/login.module';
import { UserModule } from './pages/user/user.module';
import { AccountModule } from './pages/account/account.module';
import { ChatModule } from './pages/chat/chat.module';
import { firebaseConfig } from './services/config';
import { AngularFireModule } from '@angular/fire/compat';
import { OrderPaymentMethodsComponent } from './pages/order-payment-methods/order-payment-methods.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderPaymentMethodsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    LoginModule,
    UserModule,
    ChatModule,
    AccountModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
