package com.finki.ukim.mk.library.services.impl;

import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.Loan;
import com.finki.ukim.mk.library.models.Customer;
import com.finki.ukim.mk.library.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class LoanService implements com.finki.ukim.mk.library.services.LoanService {
    private final LoanRepository loanRepository;

    @Override
    public Page<Loan> findAll(Pageable pageable) {
        return this.loanRepository.findAll(pageable);
    }

    @Override
    public Page<Loan> findAllPastDueDate(LocalDate dateDue, Pageable pageable) {
        return this.loanRepository.findTopBy(dateDue,pageable);
    }

    @Override
    public Loan getLoan(Long ID) {
       return this.loanRepository.getById(ID);
    }

    @Override
    public Loan createLoan(Book loanedBook, Customer customer, LocalDate loanDue) {
        return this.loanRepository.save(new Loan(loanedBook,loanDue, customer));
    }

    @Override
    public Loan editLoan(Long ID, Book loanedBook, LocalDate loanDue) {
        Loan loan = this.loanRepository.getById(ID);
        loan.setLoanedBook(loanedBook);
        loan.setLoanDue(loanDue);
        return this.loanRepository.save(loan);
    }

    @Override
    public void removeLoan(Long ID) {
        Loan loan = this.loanRepository.getById(ID);
        if(loan != null)
        this.loanRepository.delete(loan);
    }
}
