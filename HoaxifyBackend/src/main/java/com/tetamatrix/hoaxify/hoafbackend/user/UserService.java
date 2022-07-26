/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import com.tetamatrix.hoaxify.hoafbackend.error.NotFoundException;
import com.tetamatrix.hoaxify.hoafbackend.file.FileService;
import com.tetamatrix.hoaxify.hoafbackend.hoax.HoaxService;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserUpdateVm;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author pln226
 */
//Controller ve Repository arasındaki servis katmanıdır(katmanlı mimari)
@Service
public class UserService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    FileService fileService;

    //dependincy enjection with contsructer 
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    /*//Setter injection (2 service birbirine bağlı olduğu durumlarda kullanılır)
    @Autowired
    public void setHoaxService(HoaxService hoaxService) {
        this.hoaxService = hoaxService;
    }*/
    //insert user
    public void save(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    //select all user
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    //select user with pageable
    public Page<User> getUsersPageable(Pageable page, User user) {
        if (user != null) {
            return userRepository.findByUsernameNot(user.getUsername(), page);
        }
        return userRepository.findAll(page);
    }

    //get user by username
    public User getByUsername(String username) {
        User inDb = userRepository.findByUsername(username);
        if (inDb == null) {
            throw new NotFoundException();
        }
        return inDb;
    }

    //Hybernate kontrol işlemi
    //databaseden getirdiğimiz user için primary keyler mevcut
    //save ederken bu id nin varlığında yola çıkarak save mi update mi yapıcak buna otomatik karar veriyor
    public User updateUser(String username, UserUpdateVm updatedUser) {
        User inDb = getByUsername(username);
        inDb.setDisplayName(updatedUser.getDisplayName());
        if (updatedUser.getImage() != null) {
            String oldImageName = inDb.getImage();
            try {
                String storedFile = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
                inDb.setImage(storedFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
            fileService.deleteProfileImage(oldImageName);
        }
        return userRepository.save(inDb);
    }

    public void deleteUser(String username) {
        User inDb = getByUsername(username);
        fileService.deleteAllStoredFilesForUser(inDb);
        userRepository.delete(inDb);
    }
}
