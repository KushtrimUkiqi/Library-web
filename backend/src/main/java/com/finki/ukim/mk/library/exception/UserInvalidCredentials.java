package com.finki.ukim.mk.library.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserInvalidCredentials extends RuntimeException{
    public UserInvalidCredentials() {
        super(String.format("User credentials were not valid"));
    }
}
