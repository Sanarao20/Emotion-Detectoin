-- Emotion Detection Application Database Schema
-- This script creates the necessary tables for storing emotion detection data

-- Users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emotion analyses table for storing facial emotion detection results
CREATE TABLE IF NOT EXISTS emotion_analyses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    analysis_type VARCHAR(50) NOT NULL, -- 'facial' or 'text'
    input_data TEXT, -- Original text or image metadata
    detected_emotions JSONB NOT NULL, -- Array of {emotion, confidence} objects
    confidence_score DECIMAL(5,2),
    processing_time DECIMAL(8,3),
    model_used VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversations table for storing chat interactions
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    total_messages INTEGER DEFAULT 0,
    average_sentiment VARCHAR(50),
    topics JSONB -- Array of discussed topics
);

-- Messages table for storing individual conversation messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    sender VARCHAR(10) NOT NULL, -- 'user' or 'ai'
    content TEXT NOT NULL,
    detected_emotion VARCHAR(50),
    emotion_confidence DECIMAL(5,2),
    ai_tone VARCHAR(50), -- Adapted tone based on emotion
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics aggregation table for performance optimization
CREATE TABLE IF NOT EXISTS daily_analytics (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    total_analyses INTEGER DEFAULT 0,
    total_conversations INTEGER DEFAULT 0,
    emotion_distribution JSONB, -- {emotion: count} mapping
    average_confidence DECIMAL(5,2),
    top_emotions JSONB, -- Array of top emotions for the day
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User feedback table for improving AI responses
CREATE TABLE IF NOT EXISTS user_feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_emotion_analyses_user_id ON emotion_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_emotion_analyses_created_at ON emotion_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_emotion_analyses_type ON emotion_analyses(analysis_type);

CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_started_at ON conversations(started_at);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender);

CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON daily_analytics(date);

CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_message_id ON user_feedback(message_id);

-- Insert sample data for testing
INSERT INTO users (email, name) VALUES 
    ('demo@example.com', 'Demo User'),
    ('test@example.com', 'Test User')
ON CONFLICT (email) DO NOTHING;

-- Insert sample emotion analyses
INSERT INTO emotion_analyses (user_id, analysis_type, input_data, detected_emotions, confidence_score, processing_time, model_used) VALUES
    (1, 'facial', 'sample_image.jpg', '[{"emotion": "Happy", "confidence": 85}, {"emotion": "Surprised", "confidence": 12}]', 85.0, 1.5, 'FER2013-CNN'),
    (1, 'text', 'I am feeling great today!', '[{"emotion": "Joy", "confidence": 78}, {"emotion": "Excitement", "confidence": 15}]', 78.0, 0.8, 'roberta-base-goemotions'),
    (2, 'facial', 'another_image.jpg', '[{"emotion": "Neutral", "confidence": 65}, {"emotion": "Calm", "confidence": 25}]', 65.0, 1.2, 'FER2013-CNN')
ON CONFLICT DO NOTHING;

-- Insert sample conversation data
INSERT INTO conversations (user_id, session_id, total_messages, average_sentiment) VALUES
    (1, 'session_001', 8, 'Positive'),
    (1, 'session_002', 12, 'Neutral'),
    (2, 'session_003', 6, 'Positive')
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO messages (conversation_id, sender, content, detected_emotion, emotion_confidence, ai_tone) VALUES
    (1, 'user', 'Hello, how are you?', 'Neutral', 70.0, 'Professional'),
    (1, 'ai', 'Hello! I am doing well, thank you for asking. How are you feeling today?', NULL, NULL, 'Professional'),
    (1, 'user', 'I am feeling excited about my new project!', 'Joy', 85.0, 'Encouraging'),
    (1, 'ai', 'That is wonderful to hear! Your excitement is contagious. Tell me more about your project.', NULL, NULL, 'Encouraging')
ON CONFLICT DO NOTHING;

-- Insert sample daily analytics
INSERT INTO daily_analytics (date, total_analyses, total_conversations, emotion_distribution, average_confidence, top_emotions) VALUES
    (CURRENT_DATE - INTERVAL '1 day', 45, 12, '{"Happy": 18, "Neutral": 12, "Sad": 8, "Angry": 4, "Surprised": 3}', 78.5, '["Happy", "Neutral", "Sad"]'),
    (CURRENT_DATE, 38, 9, '{"Happy": 15, "Neutral": 10, "Joy": 7, "Sad": 4, "Anxious": 2}', 81.2, '["Happy", "Neutral", "Joy"]')
ON CONFLICT (date) DO NOTHING;
