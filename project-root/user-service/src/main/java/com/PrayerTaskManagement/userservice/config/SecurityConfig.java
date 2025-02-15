package com.PrayerTaskManagement.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF (Optional)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/users/**").permitAll() // Allow access to users
                .anyRequest().authenticated()
            )
            .formLogin(login -> login.disable()) // Disable login redirect
            .httpBasic(basic -> basic.disable()); // Disable basic auth (Optional)
        return http.build();
    }
}
