package com.feelfree.backend.serviceimplementation.Ai;

import com.feelfree.backend.entity.Mood.MoodType;
import com.feelfree.backend.service.Ai.AiService;
import org.springframework.stereotype.Service;

@Service
public class AiServiceImplementation implements AiService {

    @Override
    public String generateSupportMessage(MoodType mood) {

        return switch (mood) {

            case HAPPY ->
                    "Your energy feels warm and bright today. Stay in that light.";

            case SAD ->
                    "It’s okay to move gently today. You don’t have to rush healing.";

            case NEUTRAL ->
                    "Steady is powerful too. Not every day needs fireworks.";

            case OVERWHELMED ->
                    "Take one breath. Then another. You’re not behind.";


            case ANGRY ->
                    "Pause before reacting. Your feelings deserve space, not explosion.";

        };
    }
}
