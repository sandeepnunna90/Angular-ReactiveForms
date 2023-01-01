import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

//cross-field Custom Validator
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmEmailControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmEmailControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmEmailControl.value) {
    return null;
  }

  return { 'match': true };
}


// custome validator with parameters
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value !== null && (isNaN(c.value)) || c.value < min  || c.value > max) {
        return { 'range': true };
      }
      return null;
    }
}

// TypeScript Array function syntax - custom validator function
// const ratingRangeArrowFn = (c: AbstractControl): { [key: string]: boolean } | null => {
//   if (c.value !== null && (isNaN(c.value)) || c.value < 1  || c.value > 5) {
//     return { 'range': true };
//   }
//   return null;
// }

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: false // default value syntax
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData(): void {
    this.customerForm.setValue({ //use patchValue if only want to set few formControl elements
      firstName: 'Roronoa',
      lastName: 'Zoro',
      email: 'zoro@strawhats.com',
      sendCatalog: true
    })
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
