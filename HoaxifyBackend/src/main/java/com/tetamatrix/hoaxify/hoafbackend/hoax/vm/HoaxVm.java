/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax.vm;

import com.tetamatrix.hoaxify.hoafbackend.hoax.Hoax;
import com.tetamatrix.hoaxify.hoafbackend.user.vm.UserVm;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data
public class HoaxVm {

    private long id;
    private String content;
    private long timestamp;
    private UserVm user;

    public HoaxVm(Hoax hoax) {
        this.id = hoax.getId();
        this.content = hoax.getContent();
        this.timestamp = hoax.getTimestamp().getTime();
        this.user = new UserVm(hoax.getUser()); 
    }

}
