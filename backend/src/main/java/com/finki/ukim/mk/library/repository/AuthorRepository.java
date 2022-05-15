package com.finki.ukim.mk.library.repository;

import com.finki.ukim.mk.library.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long>
{
    public List<Author> findAll();
}
