/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Entity
@Data
public class Token {
    
    @Id
    private String token;
    
    @ManyToOne
    private User user;
    
}
