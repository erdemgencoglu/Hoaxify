/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import com.tetamatrix.hoaxify.hoafbackend.ApiError;
import com.tetamatrix.hoaxify.hoafbackend.GenericResponse;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pln226
 */
@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    //Valid ifadesi request gelmeden önce spring validationdam geçerek işleme başlar
    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User Created");
    }

    /*//MethodArgumenNotValid exception verdiğinde bu methodu çalıştır
    //Dönen hatayı Api Errora dönüştürmek için
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError HandleValidationException(MethodArgumentNotValidException exception) {
        ApiError error = new ApiError(400, "Validation Error", "/api/1.0/users");
        Map<String, String> validerr = new HashMap<>();
        for (FieldError fielderror : exception.getBindingResult().getFieldErrors()) {
            validerr.put(fielderror.getField(), fielderror.getDefaultMessage());
        }
        error.setValidationErrors(validerr);
        return error;
    }*/
}
