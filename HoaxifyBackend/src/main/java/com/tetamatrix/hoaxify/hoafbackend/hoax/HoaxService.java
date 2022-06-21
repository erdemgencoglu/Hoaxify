/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserService;
import java.util.Date;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
    
    public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
        Specification<Hoax> specIdLessThan = idLessThan(id);
        if (username != null) {
            User inDb = userService.getByUsername(username);
            Specification<Hoax> specUserIs = userIs(inDb);
            Specification<Hoax> spec = specIdLessThan.and(specUserIs);

            //return hoaxRepository.findByIdLessThanAndUser(id, inDb, page);
            hoaxRepository.findAll(spec, page);
        }
        return hoaxRepository.findAll(specIdLessThan, page);
    }
    
    public long getNewHoaxesCount(long id, String username) {
        Specification<Hoax> specIdGreaterThan = idGreaterThan(id);
        if (username != null) {
            User inDb = userService.getByUsername(username);
            specIdGreaterThan = specIdGreaterThan.and(userIs(inDb));
            //return hoaxRepository.countByIdGreaterThanAndUser(id, inDb);
        }
        return hoaxRepository.count(specIdGreaterThan);
    }
    
    public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
        if (username != null) {
            User inDb = userService.getByUsername(username);
            return hoaxRepository.findByIdGreaterThanAndUser(id, inDb, sort);
        }
        return hoaxRepository.findByIdGreaterThan(id, sort);
    }
    
    Specification<Hoax> idLessThan(long id) {
        //root.get("id") hoaxın id stunu
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.lessThan(root.get("id"), id);
        };
    }
    
    Specification<Hoax> userIs(User user) {
        //root.get("id") hoaxın id stunu
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("user"), user);
        };
    }
    
    Specification<Hoax> idGreaterThan(long id) {
        //root.get("id") hoaxın id stunu
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.greaterThan(root.get("id"), id);
        };
    }
}
