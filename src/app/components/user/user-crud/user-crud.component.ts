import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FORM_USER } from 'src/app/services/constants/forms.constant';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent implements OnInit {

  public userForm: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group(FORM_USER)
  }

  submit():void {
    this.userService.createUser(this.userForm.value);
    console.log('submit data', this.userForm.value)
  }

}
