package com.finki.ukim.mk.library.web;

import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.Customer;
import com.finki.ukim.mk.library.models.Loan;
import com.finki.ukim.mk.library.services.BookServices;
import com.finki.ukim.mk.library.services.CustomerService;
import com.finki.ukim.mk.library.services.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("loans")
public class LoanController {

    private final LoanService loanService;
    private final BookServices bookServices;
    private final CustomerService customerService;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");

    @GetMapping()
    public ResponseEntity<Page<Loan>> giveAllLoansWithPagination(Pageable pageable)
    {
        return ResponseEntity.ok(this.loanService.findAll(pageable));
    }

    @GetMapping("delayed")
    public ResponseEntity<Page<Loan>> giveDelayedLoansWithPagination(Pageable pageable, @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate dateDue)
    {
        return ResponseEntity.ok(this.loanService.findAllPastDueDate(dateDue,pageable));
    }

    @PostMapping("add")
    public ResponseEntity<Loan> addUserLoans(@RequestParam Long userID,@RequestParam Long bookID,@RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") Date dateDue)
    {
        Customer customer = null;
        Book book = null;
        Loan loan = null;

        LocalDate localDateDue = LocalDate.of(dateDue.getYear(),dateDue.getMonth(),dateDue.getDate());


        try{
            customer = this.customerService.findByID(userID);
            book = this.bookServices.findByID(bookID).orElseThrow(Exception::new);
            loan = this.loanService.createLoan(book, customer,localDateDue);
        }
        catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(loan);
    }

    @PatchMapping("{loanID}/edit")
    public ResponseEntity<Loan> editUserLoans(@PathVariable Long loanID, @RequestParam Long bookID, @RequestParam String dateDue)
    {
        Book book = null;
        Loan loan = null;
        try{
            book = this.bookServices.findByID(bookID).orElseThrow(Exception::new);
            LocalDate localDateDue  = LocalDate.parse(dateDue, this.formatter);
            loan = this.loanService.editLoan(loanID,book,localDateDue);
        }
        catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(loan);
    }

    @DeleteMapping("loans/{loanID}/return")
    public ResponseEntity<String> returnLoan(@PathVariable Long loanID){
        try {
            this.loanService.removeLoan(loanID);
        }

        catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }
}
