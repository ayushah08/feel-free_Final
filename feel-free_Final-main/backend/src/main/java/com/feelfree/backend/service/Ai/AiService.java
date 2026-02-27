package com.feelfree.backend.service.Ai;

import com.feelfree.backend.entity.Mood.MoodType;

public interface AiService {
     String  generateSupportMessage(MoodType moodType);
}
