/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;

/**
 *
 * @author pln226
 */
public interface HoaxRepository extends JpaRepository<Hoax, Long> {

    Page<Hoax> findByUser(User user, Pageable page);
    
    Page<Hoax> findByIdLessThan(long id,Pageable page);
    
    Page<Hoax> findByIdLessThanAndUser(long id,User user, Pageable page);
}
