package com.example.translator;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.security.enterprise.credential.BasicAuthenticationCredential;
import jakarta.security.enterprise.credential.Credential;
import jakarta.security.enterprise.identitystore.CredentialValidationResult;
import jakarta.security.enterprise.identitystore.IdentityStore;

import java.util.Set;

@ApplicationScoped
public class AppAuthentication implements IdentityStore {

    @Override
    public CredentialValidationResult validate(Credential credential) {
        if (credential instanceof BasicAuthenticationCredential basic) {
            String username = basic.getCaller();
            String password = basic.getPasswordAsString();

            if ("user".equals(username) && "password123".equals(password)) {
                return new CredentialValidationResult(username, Set.of("USER"));
            }
        }
        return CredentialValidationResult.INVALID_RESULT;
    }
}