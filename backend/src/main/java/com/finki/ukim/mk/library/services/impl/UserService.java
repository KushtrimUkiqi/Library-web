package com.finki.ukim.mk.library.services.impl;

import com.finki.ukim.mk.library.exception.UserNotFoundException;
import com.finki.ukim.mk.library.models.User;
import com.finki.ukim.mk.library.models.enums.Role;
import com.finki.ukim.mk.library.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements com.finki.ukim.mk.library.services.UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String s) {
            return userRepository.findByUsername(s).orElseThrow(() -> new UserNotFoundException(s));
    }


    @Override
    public User register(String username, String password, String repeatPassword, String name, String surname, Role userRole) throws Exception {
        if (username==null || username.isEmpty()  || password==null || password.isEmpty())
            throw new Exception();
        if (!password.equals(repeatPassword))
            throw new Exception();
        if(this.userRepository.findByUsername(username).isPresent())
            throw new Exception(username);
        User user = new User(username,passwordEncoder.encode(password),name,surname,userRole);
        return userRepository.save(user);
    }
}

