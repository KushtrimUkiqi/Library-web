package com.finki.ukim.mk.library.web;

import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.dto.book.BookCategoryRequestDto;
import com.finki.ukim.mk.library.models.dto.book.BookDto;
import com.finki.ukim.mk.library.models.dto.book.BookSearchResult;
import com.finki.ukim.mk.library.models.enums.Category;
import com.finki.ukim.mk.library.models.responses.BookDetailsResponse;
import com.finki.ukim.mk.library.services.BookServices;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookServices bookServices;


    @GetMapping(path = "")
    public Page<Book> giveAllBooksWithPagination(Pageable pageable)
    {
        return bookServices.findAll(pageable);
    }

    @GetMapping(path = "category")
    public Page<Book> giveAllBooksByCategory(Pageable pageable,@RequestParam BookCategoryRequestDto categories)
    {
        return this.bookServices.findAllByCategories(pageable,categories);
    }

    @GetMapping(path = "search")
    public List<BookSearchResult> giveAllBooksContainingStringWithPagination(@RequestParam String name, Pageable pageable)
    {
        return this.bookServices.findTopBy(name.toUpperCase(),pageable).map(book ->
                new BookSearchResult(book.getID(),book.getName(),book.getAuthor().getName() + " " + book.getAuthor().getSurname()))
                    .toList();
    }

    @GetMapping(path = "export/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        this.bookServices.exportToExcel(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<BookDetailsResponse> getBook(@PathVariable Long id)
    {
        Book book = null;
        System.out.println("Hello world");
        try
        {
            book = this.bookServices.findByID(id).orElseThrow(Exception::new);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().build();
        }

        BookDetailsResponse response = new BookDetailsResponse(book.getID(),book.getName(),
                book.getImageUrl(),
                book.getAvailableCopies(),
                book.getCategory(),
                book.getAuthor().getName() + " " + book.getAuthor().getSurname());

        return ResponseEntity.ok(response);
    }

    @PostMapping("add")
    public ResponseEntity<Book> addNewBook(@RequestBody BookDto bookDto) throws Exception {
        return ResponseEntity.ok().body(this.bookServices.addBook(bookDto.getName(), bookDto.getImageUrl(),bookDto.getCategory(),bookDto.getAuthorID(),bookDto.getAvailableCopies()));
    }

    @PutMapping("{ID}/edit")
    public ResponseEntity<Book> editBook(@PathVariable Long ID,@RequestParam String name,@RequestParam String imageUrl,@RequestParam Category category,@RequestParam Long authorID,@RequestParam int availableCopies){
        Book book;
        try
        {
            book = this.bookServices.editBookData(ID,name,imageUrl,category,authorID,availableCopies);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(book);
    }

    @DeleteMapping("{ID}/remove")
    public ResponseEntity<String> removeBook(@PathVariable Long ID)
    {
        try
        {
            this.bookServices.removeBook(ID);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.accepted().build();
    }

}
