/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.hoax;

import com.tetamatrix.hoaxify.hoafbackend.file.FileAttachment;
import com.tetamatrix.hoaxify.hoafbackend.user.User;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data
@Entity
public class Hoax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 1000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @ManyToOne(cascade = CascadeType.MERGE)//User entity sinide obje olarak kaydedebilmek için(Current user)
    private User user;
    
    @OneToOne(mappedBy = "hoax",orphanRemoval = true)//orphanRemoval bu hoaxla ilgili olan tüm ilişkili verileri sil
    private FileAttachment fileAttachment;
}
