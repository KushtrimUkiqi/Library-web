package com.finki.ukim.mk.library.services.impl;

import com.finki.ukim.mk.library.models.Author;
import com.finki.ukim.mk.library.models.Country;
import com.finki.ukim.mk.library.repository.AuthorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthorService implements com.finki.ukim.mk.library.services.AuthorService {
    private final AuthorRepository authorRepository;
    private final CountryService countryService;

    @Override
    public Author findByID(Long ID) throws Exception {
        return this.authorRepository.findById(ID).orElseThrow(Exception::new);
    }

    @Override
    public Author addAuthor(String name, String surname, Long countryID) throws Exception {
        Country country = this.countryService.findByID(countryID);
        Author author = new Author(name,surname,country);
        return this.authorRepository.save(author);
    }

    @Override
    public Author updateAuthor(Long ID, String name, String surname, Long countryID) throws Exception {
        Author author = this.authorRepository.findById(ID).orElseThrow(Exception::new);
        Country country = (author.getCountry().getID() != countryID) ? this.countryService.findByID(countryID) : author.getCountry();
        author.setName(name);
        author.setSurname(surname);
        author.setCountry(country);
        return this.authorRepository.save(author);
    }

    @Override
    public void removeAuthor(Long ID) throws Exception {
        Author author = this.authorRepository.findById(ID).orElseThrow(Exception::new);
        this.authorRepository.delete(author);
    }

    @Override
    public List<Author> findAll() {
        return this.authorRepository.findAll();
    }
    
}
