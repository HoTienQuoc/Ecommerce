package com.ecommerce.demo.dto;

import lombok.Data;

@Data
public class PurchaseResponse {
    //Another option is using @NonNull annotation on the field
    //instead of final
    //@NonNull
    //private String orderTrackingNumber;
    private final String orderTrackingNumber;
}
