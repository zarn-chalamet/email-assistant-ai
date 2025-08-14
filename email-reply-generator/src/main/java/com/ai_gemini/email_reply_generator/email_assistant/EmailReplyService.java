package com.ai_gemini.email_reply_generator.email_assistant;

public interface EmailReplyService {
    String generateEmailByGemini(EmailRequest emailRequest);
}
