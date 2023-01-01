import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from './customer';

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
      firstName: '', // default value syntax
      lastName: { value: '', disabled: false }, //object syntax
      email: [{ value: '', disabled: false }], //array syntax - need to use this if validators are needed for this formControl
      sendCatalog: false
    });
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
}
