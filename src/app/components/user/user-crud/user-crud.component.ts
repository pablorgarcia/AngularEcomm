import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')
        ]
      ],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }

  submit():void {
    this.userService.createUser(this.userForm.value);
    console.log('submit data', this.userForm.value)
  }

}
