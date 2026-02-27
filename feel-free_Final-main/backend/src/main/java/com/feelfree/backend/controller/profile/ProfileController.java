package com.feelfree.backend.controller.profile;


import com.feelfree.backend.dto.Achivement.AchievementSummaryDTO;
import com.feelfree.backend.service.achivement.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final AchievementService achievementService;

    @GetMapping("/{userId}/summary")
    public AchievementSummaryDTO getProfileSummary(@PathVariable Long userId){
        return achievementService.getSummary(userId);
    }

}
