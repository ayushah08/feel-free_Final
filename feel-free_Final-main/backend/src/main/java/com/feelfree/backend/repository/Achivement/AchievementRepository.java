package com.feelfree.backend.repository.Achivement;

import com.feelfree.backend.entity.Achivement.Achievement;
import com.feelfree.backend.entity.Achivement.AchievementType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface AchievementRepository extends JpaRepository<Achievement , Long> {

    Optional<Achievement> findByCode(String code);

    Collection<Object> findByType(AchievementType type);
}
