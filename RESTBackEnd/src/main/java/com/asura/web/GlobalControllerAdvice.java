package com.asura.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerAdvice {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> error(final Exception e){
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
}
