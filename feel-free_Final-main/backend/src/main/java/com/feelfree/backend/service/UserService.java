package com.feelfree.backend.service;

import com.feelfree.backend.dto.UserResponseDTO;
import com.feelfree.backend.entity.User;

import java.util.List;

public interface UserService {



        UserResponseDTO registerUser(User user);

        List<UserResponseDTO> getAllUsers();

        UserResponseDTO getUserById(Long id);
    }


