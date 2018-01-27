package com.asura.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.asura.web.entity.ApplicationUser;
import com.asura.web.entity.BasicUser;
import com.asura.web.repository.BasicUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	private static final String ROLE_PREFIX="ROLE_";
	
	@Autowired
	private BasicUserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        BasicUser applicationUser = userRepository.findByUsername(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + applicationUser.getRole().getRole()));
		return new User(applicationUser.getUsername(), applicationUser.getPassword(), authorities);
	}
}
