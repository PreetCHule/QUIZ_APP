Quiz Talk – AI-Powered Voice Interactive Quiz Application

Quiz Talk is a voice-controlled quiz platform that enables users to participate in quizzes entirely through speech. The application leverages the Web Speech API for speech recognition and text-to-speech functionality, allowing users to navigate the system, select quiz topics, answer questions, and receive feedback using voice commands.

The platform supports both predefined quiz categories and AI-generated quizzes on custom topics entered by the user. Questions are dynamically generated through a backend API, making the system flexible and capable of creating quizzes on virtually any subject. User authentication, score tracking, and quiz history are managed through a secure backend service.

Key Features
🎤 Voice-based Login and Registration
🗣️ Speech-to-Text (STT) for user interaction
🔊 Text-to-Speech (TTS) for reading questions and instructions
🤖 AI-generated quiz questions on any topic
📚 Predefined and dynamic quiz categories
⏱️ Timed multiple-choice questions
📊 Score tracking and quiz history
🔐 Token-based user authentication
🌐 REST API integration for backend communication
💻 Fully hands-free quiz experience
Tech Stack

Frontend

HTML5
CSS3
JavaScript (ES6)
Web Speech API

Backend

Django
Django REST Framework

Database

SQLite / PostgreSQL

AI Integration

Dynamic Question Generation API
How It Works
User logs in or registers using voice commands.
The system provides spoken instructions.
User selects a quiz topic by voice.
Questions are fetched from the database or generated dynamically by AI.
Questions and options are read aloud.
User answers using voice commands (A, B, C, or D).
The system evaluates answers, provides feedback, and tracks scores.
Final results and quiz history are stored and displayed.
Project Goal

The goal of Quiz Talk is to create an accessible, engaging, and hands-free learning experience by combining voice technology, AI-driven content generation, and interactive quiz mechanics into a single platform.
