/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.tetamatrix.hoaxify.hoafbackend.GenericResponse;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import java.util.List;
import java.util.function.Function;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/api/1.0/allusers")
    List<User> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/api/1.0/users")
    Page<UserVm> getUsers(Pageable page,@CurrentUser User cuser) {
        return userService.getUsersPageable(page,cuser).map((user) -> {
            return new UserVm(user);
        });
    }
}
