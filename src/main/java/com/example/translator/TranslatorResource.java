package com.example.translator;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/translate")
public class TranslatorResource {

    private final GeminiTranslationService translationService = new GeminiTranslationService();

    @GET
    @Path("/test")
    public String test() {
        return "Translator API is running.";
    }

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public String translate(String text) {
        return translationService.translateToDarija(text);
    }
}