/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.file;

import java.util.Collections;
import java.util.Map;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author pln226
 */
@RestController
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping("/api/1.0/hoax-attachments")
    Map<String, String> saveHoaxAttachment(MultipartFile multipartFile) {
        String filename = fileService.saveHoaxAttachment(multipartFile);
        Map<String, String> responseBody = Collections.singletonMap("name", filename);
        return responseBody;
    }
}
