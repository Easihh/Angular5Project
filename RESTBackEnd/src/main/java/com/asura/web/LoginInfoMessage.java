package com.asura.web;

public class LoginInfoMessage {
	
	private  String username;
	private  String password;
	
	public LoginInfoMessage() {}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "Username:"+username+" Password:"+password;
	}
}
