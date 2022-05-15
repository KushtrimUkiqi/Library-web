package com.finki.ukim.mk.library.models.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,LIBRARIAN;

    @Override
    public String getAuthority() {
        return null;
    }
}
