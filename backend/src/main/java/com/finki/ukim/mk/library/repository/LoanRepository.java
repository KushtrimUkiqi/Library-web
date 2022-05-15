package com.finki.ukim.mk.library.repository;

import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface LoanRepository extends JpaRepository<Loan,Long> {
    @Query("SELECT l FROM Loan l WHERE l.loanDue < :dateDue")
    Page<Loan> findTopBy(LocalDate dateDue, Pageable pageable);
}
