package com.ims.service.impl;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoggerClientService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String LOGGER_API_URL = "http://localhost:5000/api/log";

    @Async
    public void logToNetService(String level, String message) {
        try {
            Map<String, String> logPayload = new HashMap<>();
            logPayload.put("source", "Backend");
            logPayload.put("level", level);
            logPayload.put("message", message);

            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

            org.springframework.http.HttpEntity<Map<String, String>> request = new org.springframework.http.HttpEntity<>(
                    logPayload, headers);

            restTemplate.postForLocation(LOGGER_API_URL, request);
        } catch (Exception e) {
            // Silently fail if logger service is down to avoid impacting main flow
            System.err.println("Failed to connect to .NET Logger Service: " + e.getMessage());
        }
    }
}
