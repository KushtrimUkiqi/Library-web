package com.finki.ukim.mk.library.repository;

import com.finki.ukim.mk.library.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country,Long> {
    List<Country> findAll();
    List<Country> findAllByNameContaining(String name);
}
