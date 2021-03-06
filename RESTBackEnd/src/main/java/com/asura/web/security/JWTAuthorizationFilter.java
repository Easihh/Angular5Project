package com.asura.web.security;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JWTAuthorizationFilter extends OncePerRequestFilter{
	
	 public JWTAuthorizationFilter() {}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {

		String header = req.getHeader("Authorization");
		if (header == null || !header.contains("Bearer")) {
			/*
			 * entered restricted area without valid token, authorization will fail since
			 * security contextHolder authentication will be null in a URL that is flagged
			 * as .authenticated() in websecurityConfig
			 */
			chain.doFilter(req, res);
			return;
		}
		
		//should check for banned user/token here and filted out banned user during /login also
		
		if (SecurityContextHolder.getContext().getAuthentication() == null) {
			UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		chain.doFilter(req, res);
	}
	
	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String user = null;
		String role = null;
		token = token.substring(7, token.length());// retrieve the encoded token
		if (token != null) {
			// parse the token.
			DecodedJWT decoded = getDecodedToken(token);
			if (decoded != null) {
				user = decoded.getClaim("username").asString();
				role = decoded.getClaim("role").asString();
			}
			if (user != null && role != null) {
				List<SimpleGrantedAuthority> roles = new ArrayList<>();
				roles.add(new SimpleGrantedAuthority(role));
				return new UsernamePasswordAuthenticationToken(user, null, roles);
			}
			return null;
		}
		return null;
	}
	
	private DecodedJWT getDecodedToken(String token) {
		DecodedJWT jwt = null;
		try {
			Algorithm algorithm = Algorithm.HMAC256("mysecret");
			JWTVerifier verifier = JWT.require(algorithm).build();
			jwt = verifier.verify(token);
		} catch (UnsupportedEncodingException exception) {
			// UTF-8 encoding not supported
			System.out.println("Error:" + exception);
			return null;
		} catch (JWTVerificationException exception) {
			// Invalid signature/claims/expired
			System.out.println("Error:" + exception);
			return null;
		}
		return jwt;
	}
}
