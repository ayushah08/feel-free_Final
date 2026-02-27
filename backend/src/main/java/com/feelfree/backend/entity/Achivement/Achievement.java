package com.feelfree.backend.entity.Achivement;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    private String title;
    private String description;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false,unique = true)
    private AchievementType type;


    private String rarity;
    private int targetValue;
}
