/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.GenericResponse;
import com.tetamatrix.hoaxify.hoafbackend.hoax.vm.HoaxSubmitVm;
import com.tetamatrix.hoaxify.hoafbackend.hoax.vm.HoaxVm;
import com.tetamatrix.hoaxify.hoafbackend.user.CurrentUser;
import com.tetamatrix.hoaxify.hoafbackend.user.User;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    GenericResponse saveHoax(@Valid @RequestBody HoaxSubmitVm hoax, @CurrentUser User user) {
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

    @GetMapping({"/hoaxes/{id:[0-9]+}", "/users/{username}/hoaxes/{id:[0-9]+}"})
    ResponseEntity<?> getHoaxesRelative(
            @PathVariable long id,
            @PathVariable(required = false) String username,
            @RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
            @RequestParam(name = "direction", defaultValue = "before") String direction,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        if (count) {
            long newHoaxCount = hoaxService.getNewHoaxesCount(id, username);
            Map<String, Long> response = new HashMap<>();
            response.put("count", newHoaxCount);
            return ResponseEntity.ok(response);
        }
        if (direction.equals("after")) {
            List<HoaxVm> newHoaxes = hoaxService.getNewHoaxes(id, username, page.getSort())
                    .stream()
                    .map(HoaxVm::new).collect(Collectors.toList());
            return ResponseEntity.ok(newHoaxes);
        }
        return ResponseEntity.ok(hoaxService.getOldHoaxes(id, username, page).map(HoaxVm::new));
    }

    @DeleteMapping("/hoaxes/{id:[0-9]+}")
    @PreAuthorize("@hoaxSecurity.isAllowedToDelete(#id,principal)")
    GenericResponse deleteHoax(@PathVariable long id) {
        hoaxService.delete(id);
        return new GenericResponse("Hoax removed");
    }
}
