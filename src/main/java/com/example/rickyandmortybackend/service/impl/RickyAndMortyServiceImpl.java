package com.example.rickyandmortybackend.service.impl;

import com.example.rickyandmortybackend.service.RickyAndMortyService;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class RickyAndMortyServiceImpl implements RickyAndMortyService {

    private final WebClient webClient;

    public RickyAndMortyServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://rickandmortyapi.com/graphql").build();
    }

    @Override
    public String getCharacters(int page) {
        String query = String.format("{ \"query\": \"{ characters(page: %d) " +
                "{ results { name status species gender origin { name } } } }\" }", page);

        return webClient.post()
                .header("Content-Type", "application/json")
                .bodyValue(query)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}