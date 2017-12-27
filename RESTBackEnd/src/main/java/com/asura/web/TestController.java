package com.asura.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@RestController
public class TestController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TopicRepository topicRepository;

	@RequestMapping(value = {"/greeting","/"}, method = RequestMethod.GET)
	public Greeting greeting() {
		return new Greeting();
	}
	
	@RequestMapping(value = { "forum" }, method = RequestMethod.GET)
	public ResponseEntity<List<Topic>> getForumTopics() {
		List<Topic> topicList = new ArrayList<Topic>();
		topicRepository.findAll().forEach(topicList::add);
		return new ResponseEntity<>(topicList, HttpStatus.OK);
	}
	
	@RequestMapping(value = { "forum/topic/create" }, method = RequestMethod.PUT)
	public void createForumTopic(@RequestHeader Map<String, String> header,
			@RequestBody Map<String, String> body) {
		Topic topic = new Topic();
		String title = body.get("title");
		
		if (title == null) {
			//log as this should be stopped at client level
		}
		topic.setTitle(title);
		topic.setAuthor("Admin");
		topic.setCreated(System.currentTimeMillis());
		/*String token = getJWTToken(header);
		if(token==null) {
			
		}
		DecodedJWT dToken = getDecodedJWT(token);
		if (dToken == null) {
			return new ResponseEntity<>("Failed to create the topic.", HttpStatus.OK);
		}*/
		
		topicRepository.save(topic);
	}
	
	private DecodedJWT getDecodedJWT(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	private String getJWTToken(Map<String, String> header) {
		String token = header.get("authorization");
		if (token != null && token.contains("Bearer")) {
			token = token.substring(7, token.length());// retrieve the encoded token
		}
		return token;
	}

	@RequestMapping(value = {"test"}, method = RequestMethod.GET)
	public String test() {
		return "Adsadsad";
	}
	
	
	private String createAuthenticationToken() {
		String token = null;
		try {
			Algorithm algorith = Algorithm.HMAC256("mysecret");
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.HOUR_OF_DAY, 1);
			token = JWT.create()
					.withClaim("name", "John Doe")
					.withClaim("role", "roleX")
					.withExpiresAt(cal.getTime())
					.sign(algorith);
		} catch (UnsupportedEncodingException ee) {
			// bad encoding UTF-8 not support
			System.out.println("Error:"+ee);
		} catch (JWTCreationException ce) {
			// invalid Signing config/claim cant be converted to JSON
			System.out.println("Error:"+ce);
		}
		return token;
	}
	
	private boolean hasValidToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256("mysecret");
			JWTVerifier verifier = JWT.require(algorithm).build();
			DecodedJWT jwt = verifier.verify(token);
		} catch (UnsupportedEncodingException exception) {
			// UTF-8 encoding not supported
			System.out.println("Error:"+exception);
			return false;
		} catch (JWTVerificationException exception) {
			// Invalid signature/claims/expired
			System.out.println("Error:"+exception);
			return false;
		}
		return true;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<Message> login(@RequestBody LoginInfoMessage payload) {
		System.out.println(payload.toString());
		String token = createAuthenticationToken();
		//token = null;
		if (token == null) {
			return new ResponseEntity<Message>(new Message("Error 566:Authentication Failed."), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Message>(new Message(token), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public ResponseEntity<String> someRestrictedFunction(@RequestHeader Map<String,String> header) {
		String token=header.get("authorization");
		if (token != null && token.contains("Bearer")) {
			token = token.substring(7, token.length());//retrieve the encoded token
			return new ResponseEntity<String>(hasValidToken(token) ? "OK" : "NOT OK", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Session Token Missing or Invalid", HttpStatus.FORBIDDEN);
	}
}