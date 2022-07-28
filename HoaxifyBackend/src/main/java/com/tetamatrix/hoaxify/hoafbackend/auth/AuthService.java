/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserRepository;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import java.util.Optional;
import java.util.UUID;
import javax.transaction.Transactional;
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

    TokenRepository tokenRepository;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
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
        String token = generateRandomToken();
        //generate new token instance
        Token tokenEntity = new Token();
        tokenEntity.setToken(token);
        tokenEntity.setUser(inDb);
        tokenRepository.save(tokenEntity);
        //
        AuthResponse response = new AuthResponse();
        response.setUser(user);
        response.setToken(token);
        return response;
    }

    @Transactional
    public UserDetails getUserDetails(String token) {
        Optional<Token> optionalToken = tokenRepository.findById(token);
        if (!optionalToken.isPresent()) {
            return null;
        }
        return optionalToken.get().getUser();
    }

    public String generateRandomToken() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public void clearToken(String token) {
        tokenRepository.deleteById(token);
    }
}
