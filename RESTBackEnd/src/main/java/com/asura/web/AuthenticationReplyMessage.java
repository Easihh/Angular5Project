package com.asura.web;

import com.asura.web.entity.Battler;

public class AuthenticationReplyMessage implements Message{
	
	private String jwtoken;
	private Battler battler;

	public AuthenticationReplyMessage(String token, Battler battler) {
		this.jwtoken = token;
		this.battler = battler;
	}
	
	public String getJwtoken() {
		return jwtoken;
	}

	public Battler getBattler() {
		return battler;
	}
}
