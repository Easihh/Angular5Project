package com.asura.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class Main extends SpringBootServletInitializer{
    //used to run as jar
	/*public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}*/
	
	/* Required for War Deployment */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(Main.class);
	}

}
