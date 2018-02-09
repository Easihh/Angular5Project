package com.asura.web;

public enum ErrorType {
	BAD_CREDENTIALS("Error 422","Bad Credentials."),
	BATTLER_MISSING("Error 667", "Cannot find the given battler."),
	TOKEN_CREATION_FAILED("Error 566","Token Creation Failed."),
	UNKNOWN("Error 9999","Unknown Error.");
	
	
	private final String errorCode;
	private final String errorMessage;
	
	private ErrorType(String errCode, String errMessage) {
		errorCode = errCode;
		errorMessage = errMessage;
	}
	
	public String getErrorCode() {
		return errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}
}
