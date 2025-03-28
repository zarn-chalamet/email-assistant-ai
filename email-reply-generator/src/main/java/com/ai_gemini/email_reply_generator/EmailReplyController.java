package com.ai_gemini.email_reply_generator;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailReplyController {

    private final EmailReplyService emailReplyService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateEmailReply(@RequestBody EmailRequest emailRequest ){
        String replyEmail = emailReplyService.generateEmailByGemini(emailRequest);
        return ResponseEntity.ok(replyEmail);
    }
}
