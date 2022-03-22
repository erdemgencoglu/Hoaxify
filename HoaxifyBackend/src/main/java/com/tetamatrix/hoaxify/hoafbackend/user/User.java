/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.tetamatrix.hoaxify.hoafbackend.Views;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

/**
 *
 * @author pln226
 */
@Data //lombok extension sayesinde sadeleşmiş kod
@Entity //Veritabanı obje bazlı kaydetme
public class User {

    @Id
    @GeneratedValue
    private long id;
    @NotNull(message = "{hoaxify.constraint.username.NotNull.message}")//javax validation implement
    @Size(min = 4, max = 255)
    @UniqueUsername
    @JsonView(Views.Base.class)
    private String username;
    @NotNull
    @Size(min = 4, max = 255)
    @JsonView(Views.Base.class)
    private String displayName;
    @NotNull
    @Size(min = 8)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.Pattern.message}")//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    private String password;
    @JsonView(Views.Base.class)
    private String image;
}
