package com.finki.ukim.mk.library.services;

import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.Customer;
import com.finki.ukim.mk.library.models.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface LoanService {
    public Page<Loan> findAll(Pageable pageable);
    public Page<Loan> findAllPastDueDate(LocalDate dateDue,Pageable pageable);
    public Loan getLoan(Long ID);
    public Loan createLoan(Book loanedBook, Customer customer, LocalDate loanDue);
    public Loan editLoan(Long ID,Book loanedBook, LocalDate loanDue);
    public void removeLoan(Long ID);
}
