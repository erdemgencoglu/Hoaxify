package com.tetamatrix.hoaxify.hoafbackend;

import com.tetamatrix.hoaxify.hoafbackend.hoax.Hoax;
import com.tetamatrix.hoaxify.hoafbackend.hoax.HoaxService;
import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserService;
import java.util.Locale;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication()
public class HoaxifyApplication {

    public static void main(String[] args) {
        //Default dili ingilizce yapma
        SpringApplication.run(HoaxifyApplication.class, args);
    }

    //Spring ayağa kalkmadan önce çalışacak method
    @Bean
    @Profile("dev")
    CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService) {
        return (args) -> {
            User admin = new User();
            admin.setUsername("test");
            admin.setDisplayName("erdem");
            admin.setPassword("Erdem964069");
            userService.save(admin);
            for (int i = 0; i < 25; i++) {
                User user = new User();
                user.setUsername("user" + i);
                user.setDisplayName("display" + i);
                user.setPassword("P4ssword");
                userService.save(user);
                for (int j = 0; j < 2; j++) {
                    Hoax hoax = new Hoax();
                    hoax.setContent("hoax (" + j + ") from user (" + i + ")");
                    hoaxService.save(hoax, user);
                }
            }

        };
    }
}
