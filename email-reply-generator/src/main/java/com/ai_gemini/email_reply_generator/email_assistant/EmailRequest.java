package com.ai_gemini.email_reply_generator.email_assistant;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
