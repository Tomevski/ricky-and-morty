package com.example.rickyandmortybackend.controller;

import com.example.rickyandmortybackend.service.RickyAndMortyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RickyAndMortyController {

    @Autowired
    private RickyAndMortyService rickyAndMortyService;

    // Endpoint to fetch characters
    @GetMapping("/characters")
    public String getCharacters(@RequestParam(defaultValue = "1") int page) {
        return rickyAndMortyService.getCharacters(page);
    }
}
