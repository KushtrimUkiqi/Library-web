package com.finki.ukim.mk.library.services;

import com.finki.ukim.mk.library.models.User;
import com.finki.ukim.mk.library.models.enums.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User register(String username, String password, String repeatPassword, String name, String surname, Role role) throws Exception;
}
