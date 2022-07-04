/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.file;

import com.tetamatrix.hoaxify.hoafbackend.configuration.AppConfiguration;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import org.apache.tika.Tika;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author pln226
 */
@Service
@EnableScheduling
public class FileService {

    private static final Logger log = LoggerFactory.getLogger(FileService.class);

    AppConfiguration appConfiguration;
    Tika tika;
    FileAttachmentRepository fileAttachmentRepository;

    public FileService(AppConfiguration appConfiguration, FileAttachmentRepository fileAttachmentRepository) {

        this.appConfiguration = appConfiguration;
        this.tika = new Tika();
        this.fileAttachmentRepository = fileAttachmentRepository;
    }

    //profile img
    public String writeBase64EncodedStringToFile(String image) throws FileNotFoundException, IOException {
        String fileName = generateRandomName();
        File target = new File(appConfiguration.getProfileStoragePath() + "/" + fileName);
        OutputStream outputStream = new FileOutputStream(target);
        byte[] base64encoded = Base64.getDecoder().decode(image);
        outputStream.write(base64encoded);
        outputStream.close();
        return fileName;
    }

    public String generateRandomName() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public void deleteProfileImage(String oldImageName) {
        if (oldImageName == null) {
            return;
        }
        deleteFile(Paths.get(appConfiguration.getProfileStoragePath(), oldImageName));
    }

    public void deleteAttachmentFile(String oldImageName) {
        if (oldImageName == null) {
            return;
        }
        deleteFile(Paths.get(appConfiguration.getAttachmentStoragePath(), oldImageName));
    }

    private void deleteFile(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String detectType(byte[] array) {
        return tika.detect(array);
    }

    public String detectType(String value) {
        byte[] base64encoded = Base64.getDecoder().decode(value);
        String fileType = tika.detect(base64encoded);
        return fileType;
    }

    //hoax attachment
    public FileAttachment saveHoaxAttachment(MultipartFile multipartFile) {
        String fileName = generateRandomName();
        String fileType = null;
        try {
            File target = new File(appConfiguration.getAttachmentStoragePath() + "/" + fileName);
            OutputStream outputStream = new FileOutputStream(target);
            outputStream.write(multipartFile.getBytes());
            outputStream.close();
            fileType = detectType(multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        FileAttachment attachment = new FileAttachment();
        attachment.setName(fileName);
        attachment.setDate(new Date());
        attachment.setFileType(fileType);
        return fileAttachmentRepository.save(attachment);
    }

    //24 saatte bir çalıştır
    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void cleanUpStorage() {
        Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
        List<FileAttachment> filesToBeDeleted = fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
        for (FileAttachment file : filesToBeDeleted) {
            //delete file
            //delet from table
            deleteAttachmentFile(file.getName());
            fileAttachmentRepository.deleteById(file.getId());
            log.info("File deleted => " + file.getName());
        }
    }
}
