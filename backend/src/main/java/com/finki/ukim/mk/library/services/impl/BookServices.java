package com.finki.ukim.mk.library.services.impl;

import com.finki.ukim.mk.library.excel.GeneralExcelExporter;
import com.finki.ukim.mk.library.excel.obj.impl.ExcelData;
import com.finki.ukim.mk.library.excel.obj.impl.ExcelHeaderMetaData;
import com.finki.ukim.mk.library.models.Author;
import com.finki.ukim.mk.library.models.Book;
import com.finki.ukim.mk.library.models.dto.book.BookCategoryRequestDto;
import com.finki.ukim.mk.library.models.enums.Category;
import com.finki.ukim.mk.library.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServices implements com.finki.ukim.mk.library.services.BookServices {
    private final BookRepository bookRepository;
    private final AuthorService authorService;

    @Override
    public Optional<Book> findByID(Long ID) {
        return this.bookRepository.findById(ID);
    }

    @Override
    public List<Book> findAll() {
        return this.bookRepository.findAll();
    }

    @Override
    public Page<Book>
    findAll(Pageable pageable) {
        return this.bookRepository.findAll(pageable);
    }

    @Override
    public Page<Book> findAllByCategories(Pageable pageable, BookCategoryRequestDto categories) {
        return null;
    }


    @Override
    public Page<Book> findTopBy(String text,Pageable pageable) {
        return this.bookRepository.findTopBy(text,pageable);
    }

    @Override
    public void exportToExcel(HttpServletResponse httpServletResponse) throws IOException {
        List<Book> books = this.findAll();

        httpServletResponse.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=library_books" + currentDateTime + ".xlsx";
        httpServletResponse.setHeader(headerKey, headerValue);

        GeneralExcelExporter excelExporter = new GeneralExcelExporter();

        var headers = new ExcelHeaderMetaData(Arrays.asList("Name", "Available copies", "Category"));

        var values = new ExcelData(
                books.stream().map(book -> book.getValuesToExcel()).collect(Collectors.toList()));

        excelExporter.generateExcel("excel.xlsx",headers,values,httpServletResponse);
    }


    @Override
    @Transactional
    public Book addBook(String name,String imageUrl, Category category, Long authorID,int availableCopies) throws Exception {
        Author author = this.authorService.findByID(authorID);
        Book book = new Book(name,imageUrl,category, author,availableCopies);
        return this.bookRepository.save(book);
    }

    @Override
    public Book editBookData(Long ID,String name,String imageUrl, Category category, Long authorID,int availableCopies) throws Exception {
        Book book = this.bookRepository.findById(ID).orElseThrow(Exception::new);
        Author author = (book.getAuthor().getID() != authorID) ? this.authorService.findByID(authorID) : book.getAuthor();
        book.setName(name);
        book.setImageUrl(imageUrl);
        book.setCategory(category);
        book.setAuthor(author);
        book.setAvailableCopies(availableCopies);
        return this.bookRepository.save(book);
    }

    @Override
    public void removeBook(Long ID) throws Exception {
        Book book = this.bookRepository.findById(ID).orElseThrow(Exception::new);
        this.bookRepository.delete(book);
    }

    @Override
    public void loanBook(Long bookID, Long userID) throws Exception {
        Book book = this.bookRepository.findById(bookID).orElseThrow(Exception::new);
        if(book.getAvailableCopies() == 0){
            throw new Exception("No available copies");
        }
        //:TODO IMPLEMENT LOANING FROM USERS
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        this.bookRepository.save(book);
    }

    @Override
    public void returnBook(Long bookID, Long userID) throws Exception {
        Book book = this.bookRepository.findById(bookID).orElseThrow(Exception::new);
        if(book.getAvailableCopies() == 0){
            throw new Exception("No available copies");
        }
        //:TODO IMPLEMENT RETURNING FROM USERS
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        this.bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return this.bookRepository.findAll();
    }

    @Override
    public List<Book> findAllByNameContaining(String name) {
        return this.bookRepository.findAllByNameContaining(name);
    }

    @Override
    public List<Book> findAllByAuthor(Author author) {
        return this.bookRepository.findAllByAuthor(author);
    }
}
