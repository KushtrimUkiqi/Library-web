package com.finki.ukim.mk.library.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "author_name")
    private String name;

    private String surname;

    @OneToMany(mappedBy = "customer")
    private List<Loan> loans;

    public Customer(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }
}
