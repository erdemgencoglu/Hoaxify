/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.error;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

/**
 *
 * @author pln226
 */
@RestController
public class ErrorHandler implements ErrorController {

    @Autowired
    private ErrorAttributes errorAttributes;

    @RequestMapping("/error")
    ApiError handleError(WebRequest webRequest) {
        ErrorAttributeOptions options = ErrorAttributeOptions.of(
                ErrorAttributeOptions.Include.BINDING_ERRORS,
                ErrorAttributeOptions.Include.STACK_TRACE,
                ErrorAttributeOptions.Include.MESSAGE);
        Map<String, Object> attirubutes = this.errorAttributes.getErrorAttributes(webRequest, options);
        String message = (String) attirubutes.get("message");
        String path = (String) attirubutes.get("path");
        int status = (Integer) attirubutes.get("status");
        ApiError apiError = new ApiError(status, message, path);
        //
        if (attirubutes.containsKey("errors")) {
            List<FieldError> fieldErrors = (List<FieldError>) attirubutes.get("errors");
            Map<String, String> validerr = new HashMap<>();
            for (FieldError fielderror : fieldErrors) {
                validerr.put(fielderror.getField(), fielderror.getDefaultMessage());
            }
            apiError.setValidationErrors(validerr);
        }
        return apiError;
    }
}
