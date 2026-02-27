package com.feelfree.backend.controller.Auth;

import com.feelfree.backend.dto.UserResponseDTO;
import com.feelfree.backend.dto.auth.LoginRequest;
import com.feelfree.backend.dto.auth.LoginResponse;
import com.feelfree.backend.dto.auth.RegisterRequest;
import com.feelfree.backend.entity.Role;
import com.feelfree.backend.entity.User;
import com.feelfree.backend.repository.UserRepository;
import com.feelfree.backend.security.JwtUtil;
import com.feelfree.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/register")
    public UserResponseDTO register(@Valid @RequestBody RegisterRequest request) {

        User user = User.builder().userName(request.getUserName()).password(request.getPassword()).email(request.getEmail()).role(Role.USER).build();

        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getUserName());

        return new LoginResponse(token);
    }
}