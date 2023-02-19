import { Injectable } from '@angular/core';
import { PAYMENT_METHODS } from './constants/payment-methods.constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

  constructor() {}

  getPaymentMethods(): any {
    return PAYMENT_METHODS;
  }
}
