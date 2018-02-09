package com.asura.web;

public class ExceptionResponse implements Message{
	private String errorCode;
	private String errorMessage;
	
	public ExceptionResponse() {};
	
	public ExceptionResponse(String errCode,String errMessage) {
		errorCode = errCode;
		errorMessage = errMessage;
	}
	
	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
