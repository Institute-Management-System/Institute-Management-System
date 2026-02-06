package com.ims.controller;

import com.ims.entity.User;
import com.ims.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @org.springframework.beans.factory.annotation.Value("${app.backend.url}")
    private String backendUrl;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof User) {
            User user = (User) principal;
            // Reload to get fresh data
            return userRepository.findById(user.getId()).orElse(user);
        } else if (principal instanceof Long) {
            Long id = (Long) principal;
            return userRepository.findById(id)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));
        } else {
            String username = authentication.getName();
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        }
    }

    @GetMapping
    public ResponseEntity<User> getProfile() {
        return ResponseEntity.ok(getAuthenticatedUser());
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> updates) {
        User user = getAuthenticatedUser();

        if (updates.containsKey("name")) {
            user.setFullName((String) updates.get("name"));
        }
        if (updates.containsKey("email")) {
            String newEmail = (String) updates.get("email");
            if (!user.getEmail().equals(newEmail)) {
                if (userRepository.existsByEmail(newEmail)) {
                    return ResponseEntity.badRequest().body("Error: Email is already in use!");
                }
                user.setEmail(newEmail);
                user.setUsername(newEmail); // Sync username with email
            }
        }
        if (updates.containsKey("phone")) {
            user.setPhone((String) updates.get("phone"));
        }
        if (updates.containsKey("designation")) {
            user.setDesignation((String) updates.get("designation"));
        }

        if (updates.containsKey("password")) {
            String newPass = (String) updates.get("password");
            if (newPass != null && !newPass.trim().isEmpty()) {
                user.setPassword(passwordEncoder.encode(newPass));
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("image") org.springframework.web.multipart.MultipartFile file) {
        try {
            User user = getAuthenticatedUser();

            // Ensure uploads directory exists
            java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads/profile");
            if (!java.nio.file.Files.exists(uploadDir)) {
                java.nio.file.Files.createDirectories(uploadDir);
            }

            // Generate unique filename
            String filename = user.getId() + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path targetPath = uploadDir.resolve(filename);

            // Save file
            java.nio.file.Files.copy(file.getInputStream(), targetPath,
                    java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            // Update User Profile
            // Store relative URL accessible via WebConfig mapping
            String imageUrl = "/uploads/profile/" + filename;
            user.setProfileImage(imageUrl);
            userRepository.save(user);

            return ResponseEntity
                    .ok(java.util.Collections.singletonMap("imageUrl", backendUrl + imageUrl));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to upload image: " + e.getMessage());
        }
    }
}