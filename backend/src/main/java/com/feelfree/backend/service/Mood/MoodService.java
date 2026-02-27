package com.feelfree.backend.service.Mood;

import com.feelfree.backend.entity.Mood.Mood;
import com.feelfree.backend.entity.Mood.MoodType;
import com.feelfree.backend.entity.User;

import java.util.List;

public interface MoodService {

    Mood logMood(Long userId, MoodType moodType);

    Mood logMoodByUsername(String userName, MoodType moodType);

    List<Mood> getUserMoods(Long userId);

     void updateStreak(User user);

    List<Mood> getUserMoodByUserName(String userName);
}
