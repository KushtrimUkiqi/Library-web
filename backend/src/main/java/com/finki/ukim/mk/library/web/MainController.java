package com.finki.ukim.mk.library.web;

import com.finki.ukim.mk.library.excel.obj.impl.ExcelData;
import com.finki.ukim.mk.library.excel.obj.impl.ExcelHeaderMetaData;
import com.finki.ukim.mk.library.excel.GeneralExcelExporter;
import com.finki.ukim.mk.library.models.Author;
import com.finki.ukim.mk.library.models.enums.Category;
import com.finki.ukim.mk.library.services.AuthorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class MainController {
    private AuthorService authorService;

    @GetMapping("categories")
    public ResponseEntity<List<String>> categoryList()
    {
        return ResponseEntity.ok(Arrays.stream(Category.values()).map(category -> category.name()).collect(Collectors.toList()));
    }

//    :TODO --> to the best developer (myself) --> this method is used only for testing purposes , remove later!!
    @GetMapping("records/export/excel")
    public ResponseEntity<String> exportIntoExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=authors" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Author> listOfAuthors = authorService.findAll();

        GeneralExcelExporter excelExporter = new GeneralExcelExporter();

        var headers = new ExcelHeaderMetaData(Arrays.asList("Name", "Surname", "Country"));

        var values = new ExcelData(
                listOfAuthors.stream().map(author -> author.getValuesToExcel()).collect(Collectors.toList()));

        excelExporter.generateExcel("excel.xlsx",headers,values,response);

        return ResponseEntity.ok().build();
    }
}
