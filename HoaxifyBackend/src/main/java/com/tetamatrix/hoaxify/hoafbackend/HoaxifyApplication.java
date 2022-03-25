package com.tetamatrix.hoaxify.hoafbackend;

import com.tetamatrix.hoaxify.hoafbackend.user.User;
import com.tetamatrix.hoaxify.hoafbackend.user.UserRepository;
import com.tetamatrix.hoaxify.hoafbackend.user.UserService;
import java.util.Locale;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication()
public class HoaxifyApplication {

    public static void main(String[] args) {
        //Default dili ingilizce yapma
        Locale.setDefault(Locale.ENGLISH);
        SpringApplication.run(HoaxifyApplication.class, args);
    }

    //Spring ayağa kalkmadan önce çalışacak method
    /*@Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        {
            return new CommandLineRunner() {
                @Override
                public void run(String... args) throws Exception {
                    User user = new User();
                    user.setUsername("user1");
                    user.setPassword("P4ssword");
                    user.setDisplayName("display1");
                    userService.save(user);
                }
            };
        }
    }*/
}
