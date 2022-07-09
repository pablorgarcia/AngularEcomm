import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FORM_USER } from 'src/app/services/constants/forms.constant';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {

  customerFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.customerFormGroup = this.fb.group(FORM_USER);
  }

  submit() {
    this.userService.createUser(this.customerFormGroup.value, true);
    console.log('customer', this.customerFormGroup.value)
  }

}
