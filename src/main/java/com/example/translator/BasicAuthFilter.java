package com.example.translator;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class BasicAuthFilter implements ContainerRequestFilter {

    private static final String USERNAME = "user";
    private static final String PASSWORD = "password123";

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        // 🚨 REMOVE path check (this was your problem)
        // We protect EVERYTHING

        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            abort(requestContext);
            return;
        }

        try {
            String base64Credentials = authHeader.substring("Basic ".length()).trim();
            String credentials = new String(Base64.getDecoder().decode(base64Credentials), StandardCharsets.UTF_8);

            String[] values = credentials.split(":", 2);

            if (values.length != 2) {
                abort(requestContext);
                return;
            }

            String username = values[0];
            String password = values[1];

            if (!USERNAME.equals(username) || !PASSWORD.equals(password)) {
                abort(requestContext);
            }

        } catch (Exception e) {
            abort(requestContext);
        }
    }

    private void abort(ContainerRequestContext requestContext) {
        requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED)
                        .header(HttpHeaders.WWW_AUTHENTICATE, "Basic realm=\"Translator\"")
                        .entity("Unauthorized")
                        .build()
        );
    }
}