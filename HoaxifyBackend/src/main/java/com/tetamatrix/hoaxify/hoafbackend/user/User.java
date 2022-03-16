/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data //lombok extension sayesinde sadeleşmiş kod
@Entity
public class User {

    @Id
    @GeneratedValue
    private long id;
    private String username;
    private String displayName;
    private String password;
}
