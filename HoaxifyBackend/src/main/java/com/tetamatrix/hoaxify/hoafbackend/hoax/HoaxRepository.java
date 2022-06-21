/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 *
 * @author pln226
 */
public interface HoaxRepository extends JpaRepository<Hoax, Long>, JpaSpecificationExecutor<Hoax> {
    
    Page<Hoax> findByUser(User user, Pageable page);
    
    //Page<Hoax> findByIdLessThan(long id, Pageable page);
    
    //Page<Hoax> findByIdLessThanAndUser(long id, User user, Pageable page);
    
    //long countByIdGreaterThan(long id);
    
    //long countByIdGreaterThanAndUser(long id, User user);
    
    List<Hoax> findByIdGreaterThan(long id, Sort sort);
    
    List<Hoax> findByIdGreaterThanAndUser(long id, User user, Sort sort);
}
