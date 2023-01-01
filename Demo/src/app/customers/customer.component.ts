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
      firstName: '',
      lastName: {value: '', disabled: false},
      email: [{value: '', disabled: false}],
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
