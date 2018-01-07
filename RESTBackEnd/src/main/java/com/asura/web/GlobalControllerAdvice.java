package com.asura.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerAdvice {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionResponse> error(final Exception e){
		ExceptionResponse res=new ExceptionResponse();
		res.setErrorMessage(e.getMessage());
		res.setErrorCode("Not Found");
		return new ResponseEntity<>(res,HttpStatus.NOT_FOUND);
	}
}
