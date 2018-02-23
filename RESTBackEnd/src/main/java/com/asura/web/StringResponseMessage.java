package com.asura.web;

public class StringResponseMessage implements Message{
	
	private String message;

	public StringResponseMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
}
