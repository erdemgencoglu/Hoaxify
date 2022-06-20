/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserService;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 *
 * @author pln226
 */
@Service
public class HoaxService {

    HoaxRepository hoaxRepository;
    UserService userService;

    public HoaxService(HoaxRepository hoaxRepository, UserService userService) {
        this.hoaxRepository = hoaxRepository;
        this.userService = userService;
    }

    public void save(Hoax hoax, User user) {
        hoax.setTimestamp(new Date());
        hoax.setUser(user);
        hoaxRepository.save(hoax);
    }

    public Page<Hoax> getHoaxPageable(Pageable page) {
        return hoaxRepository.findAll(page);
    }

    public Page<Hoax> getHoaxesOfUser(String username, Pageable page) {
        User inDb = userService.getByUsername(username);
        return hoaxRepository.findByUser(inDb, page);

    }

    public Page<Hoax> getOldHoaxes(long id, Pageable page) {
        return hoaxRepository.findByIdLessThan(id, page);
    }

    public Page<Hoax> getUserOldHoaxes(String username, long id, Pageable page) {
        User inDb = userService.getByUsername(username);
        return hoaxRepository.findByIdLessThanAndUser(id, inDb, page);
    }
}
