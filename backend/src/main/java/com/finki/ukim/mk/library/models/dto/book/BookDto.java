package com.finki.ukim.mk.library.models.dto.book;

import com.finki.ukim.mk.library.models.enums.Category;
import lombok.Data;

@Data
public class BookDto {
    String name;
    String imageUrl;
    Category category;
    Long authorID;
    int availableCopies;
}

