package com.feelfree.backend.repository.Achivement;

import com.feelfree.backend.entity.Achivement.Achievement;
import com.feelfree.backend.entity.Achivement.UserAchievement;
import com.feelfree.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAchivementRepository extends JpaRepository<UserAchievement, Long> {
    List<UserAchievement> findByUser(User user);

    boolean existsByUserAndAchievement(User user, Achievement achievement);

    Optional findByUserIdAndAchievementId(Long id, Long id1);
}
