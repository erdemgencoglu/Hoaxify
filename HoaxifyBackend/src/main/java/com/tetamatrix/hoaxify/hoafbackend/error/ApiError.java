/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import java.util.Date;
import java.util.Map;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)//Jackson kütüphanesi null olmayanları dön 
public class ApiError {

    private int status;
    private String message;
    private String path;
    private long timestamp = new Date().getTime();
    private Map<String, String> validationErrors;

    public ApiError(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.path = path;
    }

}
