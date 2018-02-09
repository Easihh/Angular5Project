package com.asura.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerAdvice {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionResponse> error(final Exception e){
		ExceptionResponse res=new ExceptionResponse();
		res.setErrorMessage(e.getMessage());
		res.setErrorCode(ErrorType.UNKNOWN.getErrorCode());
		return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ExceptionResponse> errorCredentials(final Exception e){
		ExceptionResponse res=new ExceptionResponse();
		res.setErrorMessage(ErrorType.BAD_CREDENTIALS.getErrorMessage());
		res.setErrorCode(ErrorType.BAD_CREDENTIALS.getErrorCode());
		return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
	}
	
}
