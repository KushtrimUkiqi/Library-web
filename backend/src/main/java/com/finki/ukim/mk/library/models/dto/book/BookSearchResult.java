package com.finki.ukim.mk.library.models.dto.book;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookSearchResult {
    Long id;
    String name;
    String author;
}
