package com.finki.ukim.mk.library.models.responses;

import com.finki.ukim.mk.library.models.Author;
import com.finki.ukim.mk.library.models.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@Data
public class BookDetailsResponse {
    private  Long id;

    private String name;

    private String imageUrl;

    private int availableCopies;

    private Category category;

    private String author;

}
