package com.finki.ukim.mk.library.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "country_name")
    private String name;

    private String code;

    public Country(String name, String code) {
        this.name = name;
        this.code = code;
    }
}
