/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.auth;

import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data
public class AuthResponse {

    private String token;
    private UserVm user;
}
