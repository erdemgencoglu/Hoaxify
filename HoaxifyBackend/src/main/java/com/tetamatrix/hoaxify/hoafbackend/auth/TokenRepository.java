/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author pln226
 */
public interface TokenRepository extends JpaRepository<Token, String>{
    
    
}
