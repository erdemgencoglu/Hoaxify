/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import com.tetamatrix.hoaxify.hoafbackend.file.FileService;
import com.tetamatrix.hoaxify.hoafbackend.user.User;
import java.util.Arrays;
import java.util.stream.Collectors;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.hibernate.Hibernate;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidator;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author pln226
 */
class FileTypeValidator implements ConstraintValidator<FileType, String> {

    @Autowired
    FileService fileService;
    String[] types;

    @Override
    public void initialize(FileType constraintAnnotation) {
        types = constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        //boş veya image dışı birşey gelirse
        if (value == null || value.isEmpty()) {
            return true;
        }
        String fileType = fileService.detectType(value);
        for (String supportedType : this.types) {
            if (fileType.contains(supportedType)) {
                return true;
            }
        }
        String supportedTypes = Arrays.stream(this.types).collect(Collectors.joining(", "));
        //
        context.disableDefaultConstraintViolation();//default oluşturulan mesajı disable etme
        HibernateConstraintValidatorContext hybercvc = context.unwrap(HibernateConstraintValidatorContext.class);
        hybercvc.addMessageParameter("types", supportedTypes);
        hybercvc.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
        //
        return false;
    }
}
