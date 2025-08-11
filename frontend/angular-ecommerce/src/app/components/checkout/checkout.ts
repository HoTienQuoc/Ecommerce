import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Luv2ShopFormServiceService } from '../../services/luv2-shop-form-service.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit{

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormServiceService: Luv2ShopFormServiceService
  ){

  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country:[''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country:[''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode:[''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });
    //populate credit card months
    const startMonth: number = new Date().getMonth()+1;
    this.luv2ShopFormServiceService.getCreditCardMonth(startMonth).subscribe(
      data=>{this.creditCardMonths = data}
    );
    //populate credit card years
    this.luv2ShopFormServiceService.getCreditCardYear().subscribe(
      data=>{this.creditCardYears = data}
    );
  }
  onSubmit(){

  }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      // Copy shipping address to billing address
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      // Optionally clear billing address or allow manual entry
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
  
}
