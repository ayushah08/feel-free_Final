package com.feelfree.backend.controller.Mood;

import com.feelfree.backend.entity.Mood.Mood;
import com.feelfree.backend.entity.Mood.MoodType;
import com.feelfree.backend.service.Mood.MoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/moods")
public class MoodController {

    private final MoodService moodService;

    @PostMapping
    public Mood logMood(@RequestParam MoodType
                        moodType){
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();

        return moodService.logMoodByUsername(userName , moodType);
    }

    @GetMapping
    public List<Mood> getMyMoods(){

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            return moodService.getUserMoodByUserName(userName);
    }
}
