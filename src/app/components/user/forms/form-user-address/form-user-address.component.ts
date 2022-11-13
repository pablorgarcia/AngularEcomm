import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { FORM_USER_ADDRESS } from '../../../../services/constants/forms.constant';

@Component({
  selector: 'app-form-user-address',
  templateUrl: './form-user-address.component.html',
  styleUrls: ['./form-user-address.component.scss']
})
export class FormUserAddressComponent implements OnInit {

  public userAddressForm: UntypedFormGroup;
  public dataButton = { text: 'Guardar' }

  @Output() onSubmit = new EventEmitter();

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userAddressForm = this.fb.group(FORM_USER_ADDRESS)
  }

  submit(): void {
    this.onSubmit.emit(this.userAddressForm.value);
  }

}
