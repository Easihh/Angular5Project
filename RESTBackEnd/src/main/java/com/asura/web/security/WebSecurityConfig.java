package com.asura.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	private static String SIGN_UP_URL="/register";
	
	@Autowired
	private CustomAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserDetailsService userDetailsService;
		
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//http.addFilterBefore(customUsernamePasswordAuthenticationFilter(), JWTAuthenticationFilter.class);
		http.csrf().disable().authorizeRequests()
				.antMatchers(HttpMethod.PUT, SIGN_UP_URL).permitAll()
				.anyRequest().authenticated()
				.and()		
				.addFilter(new JWTAuthenticationFilter(authenticationManager()))
				.exceptionHandling()
				.authenticationEntryPoint(unauthorizedHandler)
				.and()
				// .addFilter(new JWTAuthorizationFilter(authenticationManager()))
				// this disables session creation on Spring Security
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/error");
	}
	
	 @Bean
	  CorsConfigurationSource corsConfigurationSource() {
	    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
	    return source;
	  }
	 
		public JWTAuthenticationFilter customUsernamePasswordAuthenticationFilter()
		        throws Exception {
			JWTAuthenticationFilter customUsernamePasswordAuthenticationFilter = new JWTAuthenticationFilter(authenticationManagerBean());
		   return customUsernamePasswordAuthenticationFilter;
		}
}
