package com.asura.web.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.asura.web.entity.Battler;
import com.asura.web.entity.Topic;

@RestController
public class WebSocketController {
	
	private static long testId=0;
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@MessageMapping("/send/message")
	@SendTo("/chat")
	public String send(String message) throws Exception {
		System.out.println("I got here.");
		//this.template.convertAndSend("/chat","Hello");
		return new String("Hello");
	}
	
	@Scheduled(fixedDelay = 5000)
	public void testing() throws Exception {
		Battler battler = new Battler();
		battler.setName("Battler" + testId);
		battler.setCurrentExp(0);
		battler.setLevel(1);
		battler.setNextLvl(500);
		battler.setId(testId++);
		this.template.convertAndSend("/chat", battler);
	}
}
