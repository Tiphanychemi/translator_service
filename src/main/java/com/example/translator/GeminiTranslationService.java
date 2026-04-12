package com.example.translator;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

public class GeminiTranslationService {

    private static final String MODEL = "gemini-2.5-flash-lite";

    public String translateToDarija(String text) {
        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("GEMINI_API_KEY is not set.");
        }

        Client client = Client.builder()
                .apiKey(apiKey)
                .build();


        String prompt = """
              Translate the following English text into Moroccan Darija.
               Use casual spoken Moroccan Darija.
               Do NOT use Modern/Classical Standard Arabic.
               Use simple everyday Moroccan expressions.
               Use latin characters,not arabic.
               Return ONLY the translated text.

Text: %s
""".formatted(text);

        GenerateContentResponse response = client.models.generateContent(
                MODEL,
                prompt,
                null
        );

        if (response == null || response.text() == null || response.text().isBlank()) {
            throw new RuntimeException("Empty response from Gemini.");
        }

        return response.text().trim();
    }
}