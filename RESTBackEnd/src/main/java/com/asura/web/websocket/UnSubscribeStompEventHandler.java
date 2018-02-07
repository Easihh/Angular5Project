package com.asura.web.websocket;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
public class UnSubscribeStompEventHandler implements ApplicationListener<SessionUnsubscribeEvent>{

	@Override
	public void onApplicationEvent(SessionUnsubscribeEvent event) {
		System.out.println("UnSubscription detected on:"+event.getMessage());
	}

}
