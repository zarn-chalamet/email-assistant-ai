package com.ai_gemini.email_reply_generator.resource_assistant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resources")
public class ResourceAssistantController {

    private final ResourceAssistantService resourceAssistantService;

    public ResourceAssistantController(ResourceAssistantService resourceAssistantService) {
        this.resourceAssistantService = resourceAssistantService;
    }

    @PostMapping("/process")
    public ResponseEntity<?> generateResponseEntity(@RequestBody ResearchRequest researchRequest) {
        String result = resourceAssistantService.generateAiResponse(researchRequest);
        return ResponseEntity.ok(result);
    }
}
