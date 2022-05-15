package com.finki.ukim.mk.library.repository;

import com.finki.ukim.mk.library.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
