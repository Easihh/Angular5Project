package com.asura.web.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.asura.web.ApplicationUser;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTAuthenticationFilter2 extends OncePerRequestFilter{
	
	private AuthenticationManager authenticationManager;
		
	public JWTAuthenticationFilter2(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
		//setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login","POST"));
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws ServletException, IOException {
		chain.doFilter(req, res);
	}
}
