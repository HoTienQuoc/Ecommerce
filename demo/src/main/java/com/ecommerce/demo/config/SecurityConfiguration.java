package com.ecommerce.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // protect endpoint /api/orders
        // Lambda expression using Spring Security Lambda DSL
        http.authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/api/orders/**").authenticated()
            .anyRequest().permitAll()
        )
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(
            jwt->{

            }
        ));

        // add CORE filters
        http.cors(null);
        
        return http.build();
    }
}
