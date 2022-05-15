package com.finki.ukim.mk.library.config.filters;

import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finki.ukim.mk.library.config.constants.JWTConstants;
import com.finki.ukim.mk.library.exception.UserInvalidCredentials;
import com.finki.ukim.mk.library.models.User;
import com.finki.ukim.mk.library.models.dto.user.UserDetailsDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.auth0.jwt.JWT;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.setAuthenticationManager(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        User userCredentials = new User();
            userCredentials.setUsername(request.getParameter("username"));
            userCredentials.setPassword(request.getParameter("password"));
//            userCredentials = new ObjectMapper().readValue(request.getInputStream(),User.class);

        if(userCredentials == null)
            throw new UserInvalidCredentials();

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userCredentials.getUsername());

        if(!passwordEncoder.matches(userCredentials.getPassword(),userDetails.getPassword()))
            throw new UserInvalidCredentials();

        var authentication =  this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(),
                        userCredentials.getPassword(),
                        userDetails.getAuthorities()));
        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User userDetails = (User) authResult.getPrincipal();
        var resp = this.generateJWT(response,authResult);
//        super.successfulAuthentication(request, response, chain, authResult);
    }

    public String generateJWT (HttpServletResponse response,Authentication authentication) throws IOException {
        User userDetails = (User) authentication.getPrincipal();
        String token = JWT.create()
                .withSubject(new ObjectMapper().writeValueAsString(UserDetailsDto.getInstance(userDetails)))
                .withExpiresAt(new Date(System.currentTimeMillis() + JWTConstants.EXPIRATION_DATE))
                .sign(Algorithm.HMAC256(JWTConstants.SECRECT_KEY));
//        response.addHeader(JWTConstants.HEADER_STRING, JWTConstants.TOKEN_PREFIX + token);
        response.setHeader(JWTConstants.HEADER_STRING,JWTConstants.TOKEN_PREFIX + token);
        return JWTConstants.TOKEN_PREFIX + token;
    }

}
