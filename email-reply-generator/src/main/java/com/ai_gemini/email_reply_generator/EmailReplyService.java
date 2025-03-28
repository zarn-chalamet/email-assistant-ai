package com.ai_gemini.email_reply_generator;

public interface EmailReplyService {
    String generateEmailByGemini(EmailRequest emailRequest);
}
