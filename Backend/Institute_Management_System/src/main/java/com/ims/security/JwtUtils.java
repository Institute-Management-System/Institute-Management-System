package com.ims.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    private static final String SECRET =
            "IMS_Project_JWT_Secret_Key_For_Spring_Security_2025_Very_Long";

    private static final long EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // ================= GENERATE TOKEN =================
    public String generateToken(Long userId, String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(key)
                .compact();
    }

    // ================= EXTRACT USER ID =================
    public Long extractUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    // ================= EXTRACT ROLE =================
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ================= VALIDATE TOKEN =================
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ================= INTERNAL =================
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
