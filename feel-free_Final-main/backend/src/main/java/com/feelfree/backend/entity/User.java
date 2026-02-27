package com.feelfree.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String userName;

    @NotBlank
    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

        @Enumerated(EnumType.STRING)
//        @Column(nullable = false)
        private Role role;

    private String profilePhotoUrl;

    private int currentStreak;

    private int longestStreak;

    private int totalSupportGiven;

    private int totalSupportTaken;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDate lastActivityDate;



}