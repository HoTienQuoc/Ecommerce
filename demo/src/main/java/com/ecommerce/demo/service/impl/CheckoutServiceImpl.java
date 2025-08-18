package com.ecommerce.demo.service.impl;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecommerce.demo.dao.CustomerRepository;
import com.ecommerce.demo.dto.Purchase;
import com.ecommerce.demo.dto.PurchaseResponse;
import com.ecommerce.demo.entity.Customer;
import com.ecommerce.demo.entity.Order;
import com.ecommerce.demo.entity.OrderItem;
import com.ecommerce.demo.service.CheckoutService;

import jakarta.transaction.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService{
    private CustomerRepository customerRepository;

    
    // @Autowired // is optional since we only have one constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }



    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order infor from dto
        Order order = purchase.getOrder();
        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item->order.add(item));
        //populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        //populate customer with order
        Customer customer = purchase.getCustomer();
        // check if this is an existing customer
        String theEmail = customer. getEmail ();
        Customer customerFromDB = customerRepository.findByEmail(theEmail);
        if (customerFromDB != null) {
            // we found them ... let's assign them accordingly
            customer = customerFromDB;
        }
        customer.add(order);
        //save to the database
        customerRepository.save(customer);
        //return response
        return new PurchaseResponse(orderTrackingNumber);
    }



    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version-4)
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        return UUID.randomUUID().toString();

    }

}
