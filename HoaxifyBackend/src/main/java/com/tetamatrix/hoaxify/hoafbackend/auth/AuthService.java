/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserService;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author pln226
 */
@Service
public class AuthService {

    UserService userService;

    PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse authenticate(Credentials credentials) {
        User inDb = userService.getByUsername(credentials.getUsername());
        boolean matches = passwordEncoder.matches(credentials.getPassword(), inDb.getPassword());
        if (matches) {
            UserVm user = new UserVm(inDb);
            //Token üretme my-app-secret gizli tutulmalı bilinirse her kullanıcı için token üretilebilir.
            String token = Jwts.builder().setSubject("" + inDb.getId()).signWith(SignatureAlgorithm.HS512, "my-app-secret").compact();
            AuthResponse response = new AuthResponse();
            response.setUser(user);
            response.setToken(token);
            return response;
        }
        return null;
    }

}
