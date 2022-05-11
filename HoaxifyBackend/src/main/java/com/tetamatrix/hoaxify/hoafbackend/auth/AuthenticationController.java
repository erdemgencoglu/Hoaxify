/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import com.fasterxml.jackson.annotation.JsonView;
import com.tetamatrix.hoaxify.hoafbackend.ApiError;
import com.tetamatrix.hoaxify.hoafbackend.user.CurrentUser;
import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserRepository;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import java.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pln226
 */
@RestController
public class AuthenticationController {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
    @Autowired
    UserRepository userRepository;

    @PostMapping("api/1.0/auth")
    UserVm handleAuthentication(@CurrentUser User user) {
        return new UserVm(user);
    }
}
