package com.finki.ukim.mk.library.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;

    @Column(name = "author_name")
    private String name;

    private String surname;

    @ManyToOne
    private Country country;

    public Author(String name, String surname, Country country) {
        this.name = name;
        this.surname = surname;
        this.country = country;
    }

    public List<String> getValuesToExcel()
    {
        List<String> values = new ArrayList<>(3);

        values.add(this.name);
        values.add(this.surname);
        values.add(this.country != null ? this.country.getName() : "");

        return values;
    }
}
