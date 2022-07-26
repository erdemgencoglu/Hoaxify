/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user.vm;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
import com.tetamatrix.hoaxify.hoafbackend.file.FileType;

/**
 *
 * @author pln226
 */
@Data
public class UserUpdateVm {

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @FileType(types = {"jpeg", "png"})
    private String image;
}
