import { Validators } from "@angular/forms";

const FORM_PRODUCT = {
  image: [''],
  name: [''],
  description: [''],
  sku: [''],
  price: 0,
  idProductCategory: ['', [Validators.required]]
}


const FORM_USER = {
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
}

export { FORM_PRODUCT, FORM_USER }
