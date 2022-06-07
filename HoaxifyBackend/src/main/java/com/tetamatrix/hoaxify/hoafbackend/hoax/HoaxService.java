/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import java.util.Date;
import org.springframework.stereotype.Service;

/**
 *
 * @author pln226
 */
@Service
public class HoaxService {
    
    HoaxRepository hoaxRepository;
    
    public HoaxService(HoaxRepository hoaxRepository) {
        this.hoaxRepository = hoaxRepository;
    }
    
    public void save(Hoax hoax) {
        hoax.setTimestamp(new Date());
        hoaxRepository.save(hoax);
    }
}
