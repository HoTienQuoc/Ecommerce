package com.ecommerce.demo.dto;

import java.util.Set;

import com.ecommerce.demo.entity.Address;
import com.ecommerce.demo.entity.Customer;
import com.ecommerce.demo.entity.Order;
import com.ecommerce.demo.entity.OrderItem;

import lombok.Data;

@Data
public class PurchaseDto {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
