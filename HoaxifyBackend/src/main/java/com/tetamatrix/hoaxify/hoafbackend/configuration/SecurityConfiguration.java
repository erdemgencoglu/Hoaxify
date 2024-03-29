/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 *
 * @author pln226
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.exceptionHandling().authenticationEntryPoint(new AuthEntryPoint());
        http.headers().frameOptions().disable();
        //Bu endpointlere gelen isteklerde authenticate olmasını zorunlu kıl
        http.authorizeRequests()
                //.antMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/1.0/users/{username}").authenticated()
                .antMatchers(HttpMethod.POST, "/api/1.0/hoaxes").authenticated()
                .antMatchers(HttpMethod.POST, "/api/1.0/hoax-attachments").authenticated()
                .antMatchers(HttpMethod.POST, "/api/1.0/logout").authenticated()
                .and()
                .authorizeRequests()
                .anyRequest()
                .permitAll();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);//Authenticated olduğunda Session üretimini kapatma credentials gelmesini zorla
        //eklenen filtrenin çalışma sırasını belirleme;
        http.addFilterBefore(tokenFilter(), UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    TokenFilter tokenFilter() {
        return new TokenFilter();
    }
}
