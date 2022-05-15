package com.finki.ukim.mk.library.services;

import com.finki.ukim.mk.library.models.Customer;
import com.finki.ukim.mk.library.models.Loan;

import java.util.List;

public interface CustomerService {
    Customer findByID(Long ID) throws Exception;
    Customer addUser(String name, String surname) throws Exception;
    Customer updateUser(Long ID, String name, String surname) throws Exception;
    void removeUser(Long ID) throws Exception;
    public List<Customer> findAll();
    public List<Loan> getUserLoans(Long ID);
}
