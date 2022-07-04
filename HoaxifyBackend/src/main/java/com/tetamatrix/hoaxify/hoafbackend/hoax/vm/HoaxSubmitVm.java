/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax.vm;

import javax.persistence.Column;
import javax.validation.constraints.Size;
import lombok.Data;
import org.springframework.lang.Nullable;

/**
 *
 * @author pln226
 */
@Data
public class HoaxSubmitVm {

    @Size(min = 1, max = 1000)
    private String content;
    
    @Nullable
    private Long attachmentId;
}
