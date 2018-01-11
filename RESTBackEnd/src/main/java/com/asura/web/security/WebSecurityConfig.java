package com.asura.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled=true, prePostEnabled=true)
public class WebSecurityConfig{
	
	private static String SIGN_UP_URL="/register";
	
	@Autowired
	private CustomAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Configuration
	@Order(1)
	private class AuthenticatedSecurityConfig extends WebSecurityConfigurerAdapter {
		
		public AuthenticatedSecurityConfig(){}
		
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
		}
		
		@Override
		public void configure(WebSecurity web) throws Exception {
			web.ignoring().antMatchers("/error");
		}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().antMatcher("/auth/**")
				.authorizeRequests().antMatchers("/auth/**")
				.authenticated()
				.and()
				.addFilterBefore(new JWTAuthorizationFilter(),UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling()
				.authenticationEntryPoint(unauthorizedHandler)
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		}
	}
		
	@Configuration
	private  class DefaultSecurityConfig extends WebSecurityConfigurerAdapter {
		
		public DefaultSecurityConfig() {}
		
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
		}
		
		@Override
		public void configure(WebSecurity web) throws Exception {
			web.ignoring().antMatchers("/error");
		}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.PUT, SIGN_UP_URL).permitAll()
					.antMatchers(HttpMethod.GET, "/**").permitAll()
					.antMatchers(HttpMethod.POST, "/login").permitAll()
					.and().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
					// this disables session creation on Spring Security
					.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		}
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
		return source;
	}
}
