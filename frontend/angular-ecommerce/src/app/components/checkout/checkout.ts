import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Luv2ShopFormServiceService } from '../../services/luv2-shop-form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';

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

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormServiceService: Luv2ShopFormServiceService
  ){

  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        lastName: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        email: new FormControl('', [
          Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Luv2ShopValidators.notOnlyWhiteSpace
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        city: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        state: new FormControl('', [
          Validators.required,
        ]),
        country:new FormControl('', [
          Validators.required,
        ]),
        zipCode: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        city: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        state: new FormControl('', [
          Validators.required,
        ]),
        country:new FormControl('', [
          Validators.required,
        ]),
        zipCode: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        nameOnCard: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        cardNumber: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        securityCode:new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        expirationMonth: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
        expirationYear: new FormControl('', [
          Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace
        ]),
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
    //populate countries
    this.luv2ShopFormServiceService.getCountries().subscribe(
      data=>{this.countries = data}
    ); 
  }
  onSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  get firstName(){
    return this.checkoutFormGroup.get('customer.firstname');
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastname');
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressToBillingStreet(){
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressToBillingCity(){
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressToBillingState(){
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressToBillingZipCode(){
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressToBillingCountry(){
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  ///

  get billingAddressToBillingStreet(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressToBillingCity(){
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressToBillingState(){
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressToBillingZipCode(){
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressToBillingCountry(){
    return this.checkoutFormGroup.get('billingAddress.country');
  }


  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      // Copy shipping address to billing address
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      //bug fix states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      // Optionally clear billing address or allow manual entry
      this.checkoutFormGroup.controls['billingAddress'].reset();
      //bug fix states
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    //Read the selected year from the form
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    } 
    else{
      startMonth = 1;
    }
    this.luv2ShopFormServiceService.getCreditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup!.value.Country.code;
    const countryName = formGroup!.value.Country.name;

    this.luv2ShopFormServiceService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === "shippingAddress"){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }
        //select first item by default
        formGroup!.get('state')!.setValue(data[0]);
      }
    );
  }
  
}
