package com.finki.ukim.mk.library.web;

import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.Customer;
import com.finki.ukim.mk.library.models.Loan;
import com.finki.ukim.mk.library.models.dto.customer.CreateCustomerDto;
import com.finki.ukim.mk.library.services.BookServices;
import com.finki.ukim.mk.library.services.LoanService;
import com.finki.ukim.mk.library.services.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("users")
public class CustomerController {

    private final CustomerService customerService;
    private final BookServices bookServices;
    private final LoanService loanService;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    @GetMapping("")
    public ResponseEntity<List<Customer>> getAll()
    {
        return ResponseEntity.ok(this.customerService.findAll());
    }

    @PostMapping("add")
    public ResponseEntity<Customer> addUser(@RequestBody CreateCustomerDto createCustomerDto){
        Customer customer = null;
        try {
            customer = this.customerService.addUser(createCustomerDto.getName(),createCustomerDto.getSurname());
        }
        catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(customer);
    }

    @PatchMapping("{ID}/edit")
    public ResponseEntity<Customer> editUserData(@PathVariable Long ID, @RequestParam String name, @RequestParam String surname){
        Customer customer = null;
        try {
            customer = this.customerService.updateUser(ID,name,surname);
        }
        catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(customer);
    }

    @DeleteMapping("{ID}/delete")
    public ResponseEntity<String> removeUser(@PathVariable Long ID)
    {
        try
        {
            this.customerService.removeUser(ID);
        }

        catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("users/{ID}/loans")
    public ResponseEntity<List<Loan>> getUserLoans(@PathVariable Long ID)
    {
        List<Loan> loans = this.customerService.getUserLoans(ID);
        return ResponseEntity.ok(loans);
    }
}
