/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.GenericResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pln226
 */
@RestController
public class HoaxController {

    @Autowired
    HoaxService hoaxService;

    @PostMapping("api/1.0/hoaxes")
    GenericResponse saveHoax(@Valid @RequestBody Hoax hoax) {
        hoaxService.save(hoax);
        return new GenericResponse("Hoax is saved");
    }
}
