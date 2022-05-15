package com.finki.ukim.mk.library.services;

import com.finki.ukim.mk.library.models.Author;

import java.util.List;

public interface AuthorService {
    Author findByID(Long ID) throws Exception;
    Author addAuthor(String name, String surname, Long countryID) throws Exception;
    Author updateAuthor(Long ID,String name, String surname, Long countryID) throws Exception;
    void removeAuthor(Long ID) throws Exception;
    public List<Author> findAll();
}
