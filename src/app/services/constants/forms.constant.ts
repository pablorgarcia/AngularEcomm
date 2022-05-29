import { Validators } from "@angular/forms"

const FORM_PRODUCT = {
  image: [''],
  name: [''],
  description: [''],
  sku: [''],
  price: 0,
  idProductCategory: ['', [Validators.required]]
}

export { FORM_PRODUCT }
