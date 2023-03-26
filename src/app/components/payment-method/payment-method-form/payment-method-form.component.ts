import { Component, OnInit } from '@angular/core';
import { PaymentMethodsService } from '../../../services/payment-methods.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { FORM_CREDIT_CARD } from '../../../services/constants/forms.constant';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss']
})
export class PaymentMethodFormComponent implements OnInit {

  public paymentMethods: any[];
  public paymentMethodSelected: number;
  public months: number[];
  public years: number[] = [];

  public formCreditCard: FormGroup;

  constructor(
    private paymentMethodsService: PaymentMethodsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.paymentMethods = this.paymentMethodsService.getPaymentMethods();
    this.formCreditCard = this.fb.group(FORM_CREDIT_CARD);
    this.formCreditCard.controls['creditCardNumber'].valueChanges.subscribe(value => {

    })
    const months = Array.from({length: 12}, (item, i) => { return i });
    this.months = months;
    const actualYear = new Date().getFullYear();
    const maxYear = actualYear + 10;
    for (var i = maxYear; i >= actualYear; i--) {
      this.years.push(i)
    }
  }

  setPatmentMethodSelected(paymentId: number): void {
    this.paymentMethodSelected = paymentId;
  }

  selectMonth(mounth: number): void {
    const { creditCardExpirationDate } = this.formCreditCard.controls;
    creditCardExpirationDate.setValue(mounth + '/');
    creditCardExpirationDate.updateValueAndValidity();
  }
  selectYear(year: number): void {
    const { creditCardExpirationDate } = this.formCreditCard.controls;
    creditCardExpirationDate.setValue(creditCardExpirationDate?.value + year);
    creditCardExpirationDate.updateValueAndValidity();
  }

  updateMaskCreditCard(evt): void {
    let value = evt?.target?.value.split(' ').join('');
    value = value.match(/.{1,4}/g).join(' ');
    const { creditCardNumber } = this.formCreditCard.controls;
    creditCardNumber.setValue(value);
    creditCardNumber.updateValueAndValidity();
  }

}
