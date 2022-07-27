/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserRepository;
import com.tetamatrix.hoaxify.hoafbackend.user.UserService;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author pln226
 */
@Service
public class AuthService {

    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse authenticate(Credentials credentials) {
        User inDb = userRepository.findByUsername(credentials.getUsername());
        if (inDb == null) {
            throw new AuthException();
        }
        boolean matches = passwordEncoder.matches(credentials.getPassword(), inDb.getPassword());
        if (!matches) {
            throw new AuthException();
        }
        UserVm user = new UserVm(inDb);
        //Token üretme my-app-secret gizli tutulmalı bilinirse her kullanıcı için token üretilebilir.
        String token = Jwts.builder().setSubject("" + inDb.getId()).signWith(SignatureAlgorithm.HS512, "my-app-secret").compact();
        AuthResponse response = new AuthResponse();
        response.setUser(user);
        response.setToken(token);
        return response;
    }

    public UserDetails getUserDetails(String token) {
        JwtParser parser;
        try {
            parser = Jwts.parser().setSigningKey("my-app-secret");
            parser.parse(token);//Uygulamamız tarafından üretilmemiş veya expired vermiş ise exception atar.
            Claims claims = parser.parseClaimsJws(token).getBody();
            long userId = new Long(claims.getSubject());
            User user = userRepository.getOne(userId);
            return user;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
