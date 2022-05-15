package com.finki.ukim.mk.library.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @OneToOne
    private Book loanedBook;

    private LocalDate loanDue;

    @ManyToOne
    private Customer customer;

    public Loan(Book loanedBook, LocalDate loanDue, Customer customer) {
        this.loanedBook = loanedBook;
        this.loanDue = loanDue;
        this.customer = customer;
    }
}
