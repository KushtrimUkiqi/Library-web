package com.finki.ukim.mk.library.web;

import com.finki.ukim.mk.library.models.Country;
import com.finki.ukim.mk.library.services.CountryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("countries")
@CrossOrigin(origins = "http://localhost:3000")
public class CountryController {
    private final CountryService countryService;

    @GetMapping("")
    public ResponseEntity<List<Country>> getAll()
    {
        return ResponseEntity.ok(this.countryService.findAll());
    }

    @GetMapping("{ID}")
    public ResponseEntity<Country> getCountry(@PathVariable Long ID)
    {
        Country country = null;
        try {
            country = this.countryService.findByID(ID);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(country);
    }

    @PostMapping("add")
    public ResponseEntity<Country> addCountry(@RequestParam String name,@RequestParam String code)
    {
//        :TODO add also the continent option
        Country country = null;
        try {
            country = this.countryService.addNewCountry(name,code);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(country);
    }

    @PutMapping("{ID}/edit")
    public ResponseEntity<Country> addCountry(@PathVariable Long ID, @RequestParam String name,@RequestParam String continent)
    {
        Country country = null;
        try {
            country = this.countryService.editCountry(ID,name,continent);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(country);
    }

    @DeleteMapping("{ID}/remove")
    public ResponseEntity<String> removeCountry(@PathVariable Long ID)
    {
        try {
            this.countryService.deleteCountry(ID);
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
