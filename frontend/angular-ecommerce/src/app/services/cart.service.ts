import { Subject } from 'rxjs';
import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
/** nghĩa publish events là người phát sự kiện
 * Subject is a subclass of observable 
 * We can use Subject to publish events in our code
 * The event will be sent to all of the Subscribers
 */
export class CartService {
    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    constructor(){}

    addToCart(theCartItem: CartItem){
        //check if we already have the item in our cart
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem | undefined = undefined;

        if(this.cartItems.length > 0){
            //find the item in the cart based on item id
            for (let tempCartItem of this.cartItems) {
                if(tempCartItem.id === theCartItem.id){
                    existingCartItem = tempCartItem;
                    break;
                }                
            }
            //check if we found it
            alreadyExistsInCart = (existingCartItem != undefined)
        }
        if(alreadyExistsInCart){
            if (existingCartItem) {
                existingCartItem.quatity++;
            }
        }
        else{
            this.cartItems.push(theCartItem);
        }

        // compute cart total price and total quantity
        this.computeCartTotals();
    }

    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for(let currentCartItem of this.cartItems){
            totalPriceValue += currentCartItem.quatity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quatity
        }

        // publish the new values ... all subscribers will receive the new data

        /**
         * This will publish events to all subscribers 
         * one event for totalPrice
         * one event for totalQuantity
         * 
         * .next(...)
         * publish/send event
         */
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        // log cart data just for debugging purposes
        this.logCartData(totalPriceValue, totalQuantityValue);
    }
    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        for(let tempCartItem of this.cartItems){
            const subTotalPrice = tempCartItem.quatity * tempCartItem.unitPrice;
        }
    }
}
