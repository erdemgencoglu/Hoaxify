/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author pln226
 */
@Service(value = "hoaxSecurity")
public class HoaxSecurityService {

    @Autowired
    HoaxRepository hoaxRepository;
    public boolean isAllowedToDelete(long id, User loggedInUser) {
        Optional<Hoax> optinalHoaxInDb = hoaxRepository.findById(id);
        if (!optinalHoaxInDb.isPresent()) {
            return false;
        }
        Hoax hoax = optinalHoaxInDb.get();
        if (hoax.getUser().getId() != loggedInUser.getId()) {
            return false;
        }
        return true;
    }
}
