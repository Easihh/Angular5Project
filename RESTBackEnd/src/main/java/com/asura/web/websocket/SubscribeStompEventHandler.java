package com.asura.web.websocket;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class SubscribeStompEventHandler implements ApplicationListener<SessionSubscribeEvent>{

	@Override
	public void onApplicationEvent(SessionSubscribeEvent event) {
		System.out.println("Subscription detected on:"+event.getMessage());
	}

}
