package com.finki.ukim.mk.library.repository;

import com.finki.ukim.mk.library.models.Author;
import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.enums.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book,Long>
{
    List<Book> findAll();

    @Override
    Optional<Book> findById(Long aLong);

    Page<Book> findAll(Pageable pageable);
    List<Book> findAllByNameContaining(String name);
    @Query("SELECT b FROM Book b WHERE b.category = :category")
    Page<Book> findTopByCategory(Pageable pageable, Category category);
    List<Book> findAllByAuthor(Author author);
    void deleteByID(Long ID);
    List<Book> findAllByNameContainingIgnoreCase(String name);
    @Query("SELECT b FROM Book b WHERE b.name LIKE CONCAT('%',:text ,'%')")
    Page<Book> findTopBy(String text,Pageable pageable);
}
