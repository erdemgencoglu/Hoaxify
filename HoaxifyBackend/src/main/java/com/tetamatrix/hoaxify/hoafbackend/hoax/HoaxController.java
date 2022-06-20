/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.GenericResponse;
import com.tetamatrix.hoaxify.hoafbackend.hoax.vm.HoaxVm;
import com.tetamatrix.hoaxify.hoafbackend.user.CurrentUser;
import com.tetamatrix.hoaxify.hoafbackend.user.User;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pln226
 */
@RestController
@RequestMapping("api/1.0")
public class HoaxController {

    @Autowired
    HoaxService hoaxService;

    @PostMapping("/hoaxes")
    GenericResponse saveHoax(@Valid @RequestBody Hoax hoax, @CurrentUser User user) {
        hoaxService.save(hoax, user);
        return new GenericResponse("Hoax is saved");
    }

    @GetMapping("/hoaxes")
    Page<HoaxVm> getHoaxes(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return hoaxService.getHoaxPageable(page).map(HoaxVm::new);
    }

    @GetMapping("/users/{username}/hoaxes")
    Page<HoaxVm> getUserHoaxes(@PathVariable String username, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return hoaxService.getHoaxesOfUser(username, page).map(HoaxVm::new);
    }

    @GetMapping("/hoaxes/{id:[0-9]+}")
    Page<HoaxVm> getHoaxesRelative(@PathVariable long id, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return hoaxService.getOldHoaxes(id, page).map(HoaxVm::new);
    }

    @GetMapping("/users/{username}/hoaxes/{id:[0-9]+}")
    Page<HoaxVm> getUserHoaxesRelative(@PathVariable String username, @PathVariable long id, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return hoaxService.getUserOldHoaxes(username,id, page).map(HoaxVm::new);
    }

}
