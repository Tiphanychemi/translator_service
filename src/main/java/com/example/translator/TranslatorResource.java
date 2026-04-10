package com.example.translator;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/translate")
public class TranslatorResource {

    private final GeminiTranslationService service = new GeminiTranslationService();

    @GET
    @Path("/test")
    public String test() {
        return "Translator API is running.";
    }

    @POST
    @RolesAllowed("USER")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public String translate(String text) {
        return service.translateToDarija(text);
    }
}