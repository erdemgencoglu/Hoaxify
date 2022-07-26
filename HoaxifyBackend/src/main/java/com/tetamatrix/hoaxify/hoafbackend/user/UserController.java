/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import com.tetamatrix.hoaxify.hoafbackend.error.ApiError;
import com.tetamatrix.hoaxify.hoafbackend.GenericResponse;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserUpdateVm;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pln226
 */
@RestController
@RequestMapping("/api/1.0")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    //Valid ifadesi request gelmeden önce spring validationdam geçerek işleme başlar
    @PostMapping("/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User Created");
    }

    @GetMapping("/allusers")
    List<User> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users")
    Page<UserVm> getUsers(Pageable page, @CurrentUser User cuser) {
        return userService.getUsersPageable(page, cuser).map((user) -> {
            return new UserVm(user);
        });
    }

    @GetMapping("/users/{username}")
    UserVm getUser(@PathVariable String username) {
        User user = userService.getByUsername(username);
        return new UserVm(user);
    }

    @PutMapping("/users/{username}")
    @PreAuthorize("#username == principal.username")
    UserVm updateUser(@Valid @RequestBody UserUpdateVm updatedUser, @PathVariable String username) {
        User user = userService.updateUser(username, updatedUser);
        return new UserVm((user));
    }

    @DeleteMapping("/users/{username}")
    @PreAuthorize("#username == principal.username")
    GenericResponse deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return new GenericResponse("User is removed");
    }
}
