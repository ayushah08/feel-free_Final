
🌿 FeelFree AI

AI-Powered Mental Wellness Platform


---

📌 Overview

FeelFree AI is a full-stack mental wellness platform designed to provide a safe and accessible space for users to express emotions, track mental wellbeing, and receive AI-assisted support.

The system combines anonymous social interaction, mood tracking, and AI-driven guidance to encourage consistent emotional awareness and support.


---

🚀 Key Features

Anonymous Feel Wall
Share thoughts safely and interact through supportive reactions and comments.

Mood Tracking System
Log daily emotions and maintain streaks to monitor mental patterns.

AI Support Assistant
Provides contextual, emotionally aware responses based on user input.

Achievements & Streaks
Gamified system to encourage regular engagement.

Calm Zone
Breathing exercises and relaxation tools for real-time stress management.



---

🧠 Problem Statement

Mental health challenges are increasing, yet many individuals hesitate to seek support due to stigma, lack of access, or cost.

There is a need for a safe, private, and accessible platform that allows individuals to express emotions and receive support without barriers.


---

💡 Solution

FeelFree AI provides a digital ecosystem for emotional wellbeing, enabling users to:

Express emotions anonymously

Track mental health consistently

Receive AI-based emotional support

Engage with a supportive community



---

⚙️ Tech Stack

Frontend

React (Vite)

Tailwind CSS


Backend

Spring Boot

Spring Security

JWT Authentication

JPA / Hibernate


Database

H2 Database (Development)


AI Integration

LLM-based response system for emotional guidance



---

🏗 System Architecture

User
 ↓
React Frontend
 ↓
HTTP Requests (JWT)
 ↓
Spring Security Layer
 ↓
Controller → Service → Repository
 ↓
Database (H2)
 ↓
AI Service (for emotional response)


---

🔐 Authentication & Security

JWT-based authentication

Stateless session handling

Protected REST APIs

Secure request validation via Spring Security



---

📡 API Overview

Authentication

POST /api/auth/register
POST /api/auth/login

Mood Tracking

POST /api/moods
GET /api/moods

Feel Wall

GET /api/posts
POST /api/posts
POST /api/posts/{postId}/react
POST /api/posts/{postId}/comment
GET /api/posts/{postId}/comments

Achievements

GET /api/achievements/{userId}


---

🧠 AI Capabilities

Emotion-aware conversational responses

Context-based guidance suggestions

Support-oriented interaction model



---

🌍 Future Scope

Cloud deployment (AWS / Azure)

Mobile application (React Native)

Advanced emotion detection and sentiment analysis

Personalized mental health insights dashboard

Therapist and professional support integration



---

🏆 Project Context

Developed as part of a hackathon to address real-world mental health challenges through technology and AI.


---

⚡ Getting Started

Backend

mvn spring-boot:run

Frontend

npm install
npm run dev


---

🔗 Environment Configuration

VITE_API_BASE_URL=http://localhost:8080/api


---

👨‍💻 Team

CODE_X


---

📌 Vision

> To build a stigma-free digital environment where individuals can safely express emotions and access support anytime.




---

⭐ Support

If you find this project valuable, consider giving it a ⭐ on GitHub.


---





