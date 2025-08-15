package com.ecommerce.demo.service;

import com.ecommerce.demo.dto.PurchaseDto;
import com.ecommerce.demo.dto.PurchaseResponse;

public interface CheckService {
    PurchaseResponse placeOrder(PurchaseDto purchase);

}
