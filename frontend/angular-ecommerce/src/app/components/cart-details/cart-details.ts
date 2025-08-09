import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  imports: [],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.scss'
})
export class CartDetails implements OnInit{
  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get a handle to the cart items
    this.cartItem = this.cartService.cartItems;
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity = data
    );
    //compute cart total price and quantity
    this.cartService.computeCartTotals();
  }
}
