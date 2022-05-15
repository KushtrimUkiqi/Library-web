package com.finki.ukim.mk.library.services.impl;

import com.finki.ukim.mk.library.models.Country;
import com.finki.ukim.mk.library.repository.CountryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CountryService implements com.finki.ukim.mk.library.services.CountryService {

    private final CountryRepository countryRepository;

    @Override
    public Country findByID(Long ID) throws Exception {
        return this.countryRepository.findById(ID).orElseThrow(Exception::new);
    }

    @Override
    public Country addNewCountry(String name, String code) {
        Country newCountry = new Country(name,code);
        return this.countryRepository.save(newCountry);
    }

    @Override
    public Country editCountry(Long ID,String name, String code) {
        Country countryToBeEdited  = this.countryRepository.getById(ID);
        countryToBeEdited.setName(name);
        countryToBeEdited.setCode(code);
        return this.countryRepository.save(countryToBeEdited);
    }

    @Override
    public void deleteCountry(Long ID) {
        this.countryRepository.deleteById(ID);
    }

    @Override
    public List<Country> findAll() {
        return  this.countryRepository.findAll();
    }

    @Override
    public List<Country> findAllByNameContaining(String name) {
        return this.countryRepository.findAllByNameContaining(name);
    }
}
