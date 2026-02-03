package com.ims.controller;

import com.ims.dto.ForgotPasswordRequest;
import com.ims.dto.JwtResponse;
import com.ims.dto.LoginRequest;
import com.ims.dto.RegisterRequest;
import com.ims.dto.ResetPasswordRequest;
import com.ims.entity.PasswordResetToken;
import com.ims.entity.Role;
import com.ims.entity.User;
import com.ims.repository.PasswordResetTokenRepository;
import com.ims.repository.UserRepository;
import com.ims.security.JwtUtils;
import com.ims.service.EmailService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private JwtUtils jwtUtils;

        @Autowired
        private PasswordResetTokenRepository tokenRepository;

        @Autowired
        private EmailService emailService;

        // ================= LOGIN =================
        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                                                loginRequest.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

                if (!user.getStatus() && user.getRole() != Role.ADMIN) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body("You are not allowed to login contact admin!");
                }

                String jwt = jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRole().name());

                List<String> roles = userDetails.getAuthorities().stream()
                                .map(item -> item.getAuthority())
                                .collect(Collectors.toList());

                return ResponseEntity.ok(new JwtResponse(jwt,
                                user.getId(),
                                user.getUsername(),
                                user.getEmail(),
                                roles));
        }

        // ================= REGISTER =================
        @PostMapping("/register")
        public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
                if (userRepository.existsByEmail(signUpRequest.getEmail())) { // Use email as username
                        return ResponseEntity
                                        .badRequest()
                                        .body("Error: Email is already taken!"); // Changed message to reflect email
                                                                                 // check
                }

                // Create new user's account
                User user = new User();
                user.setFullName(signUpRequest.getFullName());
                user.setEmail(signUpRequest.getEmail());
                user.setUsername(signUpRequest.getEmail()); // Username = Email
                user.setPassword(passwordEncoder.encode(signUpRequest.getPassword())); // Changed encoder to
                                                                                       // passwordEncoder

                // Handle Role
                String roleStr = signUpRequest.getRole();
                Role role = Role.STUDENT; // Default
                if (roleStr != null) {
                        try {
                                role = Role.valueOf(roleStr.toUpperCase());
                        } catch (IllegalArgumentException e) {
                                // ignore, default to STUDENT or error?
                        }
                }
                user.setRole(role);

                // Set Required fields to avoid Not Null constraints if they have defaults or
                // dummy
                // User entity has many non-nullable fields (phone, address, etc.)
                // We might need to set dummy values or change entity to allow nulls
                // Checking User entity...
                // phone nullable=false
                // dob nullable=false
                // address nullable=false
                // qualification nullable=false
                // rollNumber nullable=false
                // designation nullable=false

                // For registration, we need to provide these. DTO doesn't have them.
                // We might need to set dummy values or change entity to allow nulls

                // Handle Phone: Use provided or generate unique dummy
                if (signUpRequest.getPhone() != null && !signUpRequest.getPhone().isEmpty()) {
                        user.setPhone(signUpRequest.getPhone());
                } else {
                        // Generate unique dummy phone to avoid "Duplicate entry" constraint
                        user.setPhone("9" + String.valueOf(System.currentTimeMillis()).substring(4));
                }

                user.setAddress("Not Provided");
                user.setDob(LocalDate.now()); // Dummy
                user.setQualification("Not Provided");
                // Ensure Roll Number is unique
                user.setRollNumber("TEMP-" + System.currentTimeMillis());
                user.setDesignation("None");
                user.setAdmissionDate(LocalDate.now());
                user.setStatus(false); // Default status for new users

                userRepository.save(user);

                return ResponseEntity.ok("User registered successfully!");
        }

        @PostMapping("/forgot-password")
        public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
                String email = request.getEmail();
                User user = userRepository.findByEmail(email).orElse(null); // Assuming findByEmail exists in Repo or we
                                                                            // use
                                                                            // custom query

                // We can also use findByUsername if username is email
                // In registerUser we saw: user.setUsername(signUpRequest.getEmail());
                // So findByEmail should be sufficient if email is always username.
                // If not, we might need findByUsername as well. Sticking to findByEmail as per
                // original code.

                if (user == null) {
                        return ResponseEntity.badRequest().body("Error: User with this email does not exist!");
                }

                // Check if token already exists, if so delete it (or update)
                // Since we don't have update logic, let's just delete old one if exists
                Optional<PasswordResetToken> existingToken = tokenRepository.findByUser(user);
                existingToken.ifPresent(tokenRepository::delete);

                String token = UUID.randomUUID().toString();
                PasswordResetToken myToken = new PasswordResetToken(token, user);
                tokenRepository.save(myToken);

                // Send Email
                // Construct link (hardcoded frontend URL for now, or from properties)
                String resetLink = "http://localhost:3000/reset-password?token=" + token;

                emailService.sendEmail(
                                user.getEmail(),
                                "Password Reset Request",
                                "Click the link to reset your password: " + resetLink);

                return ResponseEntity.ok("Password reset link sent to your email!");
        }

        @PostMapping("/reset-password")
        public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
                String token = request.getToken();
                String newPassword = request.getPassword();

                PasswordResetToken resetToken = tokenRepository.findByToken(token)
                                .orElse(null);

                if (resetToken == null) {
                        return ResponseEntity.badRequest().body("Invalid token!");
                }

                if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
                        tokenRepository.delete(resetToken);
                        return ResponseEntity.badRequest().body("Token has expired!");
                }

                User user = resetToken.getUser();
                user.setPassword(passwordEncoder.encode(newPassword)); // Changed encoder to passwordEncoder
                userRepository.save(user);

                tokenRepository.delete(resetToken);

                return ResponseEntity.ok("Password reset successfully!");
        }
}
