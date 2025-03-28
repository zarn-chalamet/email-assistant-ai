package com.ai_gemini.email_reply_generator;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
