package com.finki.ukim.mk.library.config.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finki.ukim.mk.library.config.constants.JWTConstants;
import com.finki.ukim.mk.library.models.dto.user.UserDetailsDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;


public class JWTAuthorizationFilter extends BasicAuthenticationFilter {


    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        var r = request.getServletPath();
        if(request.getServletPath().equals("/library/login"))
        {
            chain.doFilter(request,response);
        }

        else {
            String header = request.getHeader(JWTConstants.HEADER_STRING);
            if (header == null || !header.startsWith(JWTConstants.TOKEN_PREFIX)) {
                chain.doFilter(request, response);
                return;
            }

            String user = JWT.require(Algorithm.HMAC256(JWTConstants.SECRECT_KEY.getBytes()))
                    .build()
                    .verify(header.replace(JWTConstants.TOKEN_PREFIX, ""))
                    .getSubject();

            if(user == null)
            {
                return;
            }

            UserDetailsDto userDetailsDto = new ObjectMapper().readValue(user,UserDetailsDto.class);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetailsDto.getUsername(), "",Collections.singleton(userDetailsDto.getRole()));
            SecurityContextHolder.getContext().setAuthentication(token);
            chain.doFilter(request,response);
        }
    }
}
