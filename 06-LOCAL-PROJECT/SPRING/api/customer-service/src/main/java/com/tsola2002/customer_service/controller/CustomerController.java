package com.tsola2002.customer_service.controller;

import com.tsola2002.customer_service.entity.Customer;
import com.tsola2002.customer_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
    private final CustomerRepository customerRepository;
    private final RestTemplate restTemplate;

    @Value("${order.service.url}")
    private String orderServiceUrl;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        this.restTemplate = new RestTemplate();
    }

    @GetMapping
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}/orders")
    public Object getCustomerOrders(@PathVariable Long id) {

        String url = orderServiceUrl + "/api/v1/order/customer/" + id;

        return restTemplate.getForObject(url, Object.class);
    }
}
