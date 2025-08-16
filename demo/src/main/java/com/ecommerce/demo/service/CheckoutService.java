package com.ecommerce.demo.service;

import com.ecommerce.demo.dto.Purchase;
import com.ecommerce.demo.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
