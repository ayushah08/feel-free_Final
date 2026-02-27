package com.feelfree.backend.repository.Mood;

import com.feelfree.backend.entity.Mood.Mood;
import com.feelfree.backend.entity.Mood.MoodType;
import com.feelfree.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoodRepository extends JpaRepository<Mood , Long> {
    int countByUser(User user);

    int countByUserAndMoodType(User user, MoodType moodType);


    Object countByUserId(Long id);

    List<Mood> findByUser(User user);

    List<Mood> findUserById(Long userId);
}
