package com.tetamatrix.hoaxify.hoafbackend;

import java.util.Locale;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class HoaxifyApplication {

    public static void main(String[] args) {
        //Default dili ingilizce yapma
        Locale.setDefault(Locale.ENGLISH);
        SpringApplication.run(HoaxifyApplication.class, args);
    }

}
