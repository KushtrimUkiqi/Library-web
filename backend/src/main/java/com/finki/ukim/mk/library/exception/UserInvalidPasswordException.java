package com.finki.ukim.mk.library.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserInvalidPasswordException extends RuntimeException{
    public UserInvalidPasswordException () {
        super(String.format("User password is not correct!"));
    }
}
