package com.finki.ukim.mk.library.services.impl;

import com.finki.ukim.mk.library.models.Customer;
import com.finki.ukim.mk.library.models.Loan;
import com.finki.ukim.mk.library.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService implements com.finki.ukim.mk.library.services.CustomerService {
    private final CustomerRepository customerRepository;

    @Override
    public Customer findByID(Long ID) throws Exception {
        return this.customerRepository.getById(ID);
    }

    @Override
    public Customer addUser(String name, String surname) throws Exception {
        return this.customerRepository.save(new Customer(name, surname));
    }

    @Override
    public Customer updateUser(Long ID, String name, String surname) throws Exception {
        Customer customer = this.customerRepository.getById(ID);
        customer.setName(name);
        customer.setSurname(surname);
        return this.customerRepository.save(customer);
    }

    @Override
    public void removeUser(Long ID) throws Exception {
        Customer customer = this.customerRepository.getById(ID);
        this.customerRepository.delete(customer);
    }

    @Override
    public List<Customer> findAll() {
        return this.customerRepository.findAll();
    }

    @Override
    public List<Loan> getUserLoans(Long ID) {
        Customer customer = this.customerRepository.getById(ID);
        return customer.getLoans();
    }
}
