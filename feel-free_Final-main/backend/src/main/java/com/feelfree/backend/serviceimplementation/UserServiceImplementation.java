package com.feelfree.backend.serviceimplementation;

import com.feelfree.backend.dto.UserResponseDTO;
import com.feelfree.backend.entity.User;
import com.feelfree.backend.repository.UserRepository;
import com.feelfree.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {



    @Autowired
   private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;
    
    @Override
    public UserResponseDTO registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        List<UserResponseDTO> allUsers = userRepository.findAll().stream().map(this::mapToDTO).toList();
        return allUsers;
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User userById = userRepository.findById(id).orElseThrow(()->new RuntimeException("User Not Found with ID : " + id));
        return mapToDTO(userById);
    }

    private UserResponseDTO mapToDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .profilePhotoUrl(user.getProfilePhotoUrl())
                .currentStreak(user.getCurrentStreak())
                .longestStreak(user.getLongestStreak())
                .totalSupportGiven(user.getTotalSupportGiven())
                .totalSupportTaken(user.getTotalSupportTaken())
                .build();
    }



    public void updateStreak(User user) {

        LocalDate today = LocalDate.now();
        LocalDate lastDate = user.getLastActivityDate();

        if (lastDate == null) {
            user.setCurrentStreak(1);

        } else if (lastDate.equals(today)) {
            return; // Already counted today

        } else if (lastDate.plusDays(1).equals(today)) {
            user.setCurrentStreak(user.getCurrentStreak() + 1);

        } else {
            user.setCurrentStreak(1);
        }

        if (user.getCurrentStreak() > user.getLongestStreak()) {
            user.setLongestStreak(user.getCurrentStreak());
        }

        user.setLastActivityDate(today);

    }

    @Override
    public UserResponseDTO getByUsername(String username) {
        User user = userRepository.findByUserName(username).orElseThrow(()->new RuntimeException("User not found"));

        return mapToDTO(user);
    }

}
