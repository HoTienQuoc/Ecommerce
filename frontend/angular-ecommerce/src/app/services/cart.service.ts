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
    constructor(){}

}
