package com.ims.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map /images/** URL to the local uploads directory
        // "file:./uploads/" tells Spring to look in the uploads folder in the project
        // root
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./uploads/");

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/");
    }
}
