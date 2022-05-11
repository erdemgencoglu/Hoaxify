/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user.vm;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data
public class UserVm {

    private String username;
    private String displayName;
    private String image;

    public UserVm(User user) {
        this.setUsername(user.getUsername());
        this.setDisplayName(user.getDisplayName());
        this.setImage(user.getImage());
    }
    
    
    
}
