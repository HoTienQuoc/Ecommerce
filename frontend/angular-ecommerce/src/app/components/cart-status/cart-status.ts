import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-status',
  imports: [CommonModule],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.scss'
})
export class CartStatus implements OnInit{
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService){

  }
  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data //when new events are received, assignments to update ui
    );

    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data //when new events are received, assignments to update ui
    );
  }

}
