/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.file.vm;

import com.tetamatrix.hoaxify.hoafbackend.file.FileAttachment;
import lombok.Data;

/**
 *
 * @author pln226
 */
@Data
public class FileAttachmentVm {

    private String name;
    private String fileType;
    public FileAttachmentVm(FileAttachment fileAttachment) {
        this.setName(fileAttachment.getName());
        this.setFileType(fileAttachment.getFileType());
    }
    
    
    
}
