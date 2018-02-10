package com.asura.web;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asura.web.entity.ApplicationUser;
import com.asura.web.entity.BasicUser;
import com.asura.web.entity.Battler;
import com.asura.web.entity.News;
import com.asura.web.entity.Role;
import com.asura.web.entity.Topic;
import com.asura.web.entity.TopicReply;
import com.asura.web.entity.TopicReplyWrapper;
import com.asura.web.entity.UserRole;
import com.asura.web.repository.ApplicationUserRepository;
import com.asura.web.repository.BasicUserRepository;
import com.asura.web.repository.BattlerRepository;
import com.asura.web.repository.NewsRepository;
import com.asura.web.repository.TopicReplyRepository;
import com.asura.web.repository.TopicRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

@RestController
public class TestController {
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	private TopicRepository topicRepository;
	
	@Autowired
	private BattlerRepository battlerRepository;
	
	@Autowired
	private BasicUserRepository userRepository;
	
	@Autowired
	private NewsRepository newsRepository;
	
	@Autowired
	private TopicReplyRepository topicReplyRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private ApplicationUserRepository applicationUserRepository;
			
	@RequestMapping(value = { "forum/topic" }, method = RequestMethod.GET)
	public ResponseEntity<TopicReplyWrapper> getTopicReplies(@RequestParam("topicId") long topicId,
			@RequestParam("pageNumber") int pageNumber) throws Exception {
		Topic topic = topicRepository.findOne(topicId);
		if (topic == null) {
			throw new Exception("Topic with id:" + topicId + " does not exist.");
		}
		String topicTitle = topic.getTitle();
		List<TopicReply> topicReplies = topicReplyRepository.getPagedTopicRepliesByTopicId(topicId, pageNumber);
		int total = topicReplyRepository.getTotalTopicRepliesByTopicId(topicId);
		TopicReplyWrapper wrapper = new TopicReplyWrapper(total, topicReplies, topicTitle,topic.isLocked());
		return new ResponseEntity<>(wrapper, HttpStatus.OK);
	}

	@RequestMapping(value = { "forum" }, method = RequestMethod.GET)
	public ResponseEntity<List<Topic>> getForumTopics(@RequestParam("pageNumber") int pageNumber,
			@RequestParam("forumId") long forumId) {
		Map<Long, Long> orderInfoMap = new HashMap<Long, Long>();
		
		Query query = entityManager
				.createNativeQuery("select tr.topic_id,count(*) from TOPIC_REPLIES tr " + "group by tr.topic_id");
		
		List<Topic> topicList = topicRepository.getTopicByPageOrderByLastUpdated(pageNumber,forumId);

		List<Object[]> test = query.getResultList();
		for (Object[] objArr : test) {
			Long topicId = ((BigDecimal) objArr[0]).longValue();
			Long repliesCount = ((BigDecimal) objArr[1]).longValue();
			repliesCount -= 1;// dont count topic creation reply.
			orderInfoMap.put(topicId, repliesCount);
		}
		
		for(Topic topic:topicList) {
			topic.setRepliesCounter(orderInfoMap.get(topic.getId()));
		}
		return new ResponseEntity<>(topicList, HttpStatus.OK);
	}
	
	@RequestMapping(value = { "/auth/forum/topic/create" }, method = RequestMethod.PUT)
	@PreAuthorize("hasRole('Admin')")
	public void createForumTopic(@RequestBody Map<String, String> body) {
		Topic topic = new Topic();
		String title = body.get("title");
		String bodyText=body.get("body");
		Long forumId = Long.valueOf(body.get("forumId"));
		if (title == null || bodyText == null || forumId == null) {
			// this should be stopped at client level and not happen in normal circumstance
			return;
		}
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = applicationUserRepository.findByUsername(auth.getName());
		currentUser.setPostCount(currentUser.getPostCount() + 1);
		topic.setTitle(title);
		topic.setCreatedBy(currentUser);
		topic.setCreated(System.currentTimeMillis());
		topic.setLastUpdated(System.currentTimeMillis());
		topic.setForumId(forumId);
		Topic savedTopic = topicRepository.save(topic);
		TopicReply reply = new TopicReply();
		reply.setCreatedBy(currentUser);
		reply.setReplyComment(bodyText);
		reply.setTopicId(savedTopic.getId());
		reply.setCreated(System.currentTimeMillis());
		topicReplyRepository.save(reply);
		applicationUserRepository.save(currentUser);
	}
	
	@RequestMapping(value = { "auth/forum/topic/reply/create" }, method = RequestMethod.PUT)
	public void createForumTopicReply(@RequestHeader Map<String, String> header,
			@RequestBody Map<String, String> body) {
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		ApplicationUser currentUser = applicationUserRepository.findByUsername(auth.getName());
		String topicIdStr = body.get("topicId");
		String commentText = body.get("body");
		if (topicIdStr != null) {
			long topicId = Long.valueOf(topicIdStr);
			Topic topic = topicRepository.findOne(topicId);
			if (topic != null) {
				currentUser.setPostCount(currentUser.getPostCount() + 1);
				TopicReply reply = new TopicReply();
				reply.setCreatedBy(currentUser);
				reply.setCreated(System.currentTimeMillis());
				reply.setTopicId(topicId);
				reply.setReplyComment(commentText);
				topicReplyRepository.save(reply);
				
				topic.setLastUpdated(System.currentTimeMillis());
				topicRepository.save(topic);
				applicationUserRepository.save(currentUser);
			}
		}
	}

	private String createAuthenticationToken(String username, Collection<? extends GrantedAuthority> authorities) {
		String token = null;
		if (authorities.size() > 1) {
			return null;// user can only have 1 role.
		}
		SimpleGrantedAuthority roleClaims = authorities.toArray(new SimpleGrantedAuthority[1])[0];
		try {
			Algorithm algorith = Algorithm.HMAC256("mysecret");
			token = JWT.create()
					.withClaim("username", username)
					.withClaim("role", roleClaims.getAuthority())
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
	
	@RequestMapping(value = "/register", method = RequestMethod.PUT)
	public void register(@RequestBody BasicUser user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		Role role = new Role(UserRole.USER);
		user.setRole(role);
		user=userRepository.save(user);
		
		Battler battler=new Battler();
		battler.setCurrentExp(0);
		battler.setLevel(1);
		battler.setNextLvl(500);
		battler.setCurrentExp(0);
		battler.setUserId(user.getId());
		battler.setName(user.getUsername());
		battlerRepository.save(battler);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<Message> login(@RequestBody LoginInfoMessage payload) {

		Authentication authentication=authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(payload.getUsername(), payload.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		Battler battler = battlerRepository.findByName(payload.getUsername());
		
		if (battler == null) {
			return new ResponseEntity<Message>(
					new ExceptionResponse(ErrorType.BATTLER_MISSING.getErrorCode(),
							ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + payload.getUsername()),
					HttpStatus.BAD_REQUEST);
		}
			
		String token =createAuthenticationToken(authentication.getName(),authentication.getAuthorities());
		if (token == null) {
			return new ResponseEntity<Message>(new ExceptionResponse(ErrorType.TOKEN_CREATION_FAILED.getErrorCode(),ErrorType.TOKEN_CREATION_FAILED.getErrorMessage()), HttpStatus.BAD_REQUEST);
		}
			return new ResponseEntity<Message>(new AuthenticationReplyMessage(token,battler),HttpStatus.OK);
	}

	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	@PreAuthorize("hasRole('SUPERADMIN')")
	public ResponseEntity<String> someRestrictedFunction(@RequestHeader Map<String,String> header) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/news", method = RequestMethod.GET)
	public ResponseEntity<List<News>> getLatestNews(@RequestHeader Map<String, String> header) {
		List<News> newsList = newsRepository.getAllNews();
		return new ResponseEntity<>(newsList, HttpStatus.OK);
	}
	
	@RequestMapping(value = "auth/arena/enter", method = RequestMethod.PUT)
	public ResponseEntity<Battler> enterArena() throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Battler battler = battlerRepository.findByName(auth.getName());
		if (battler == null) {
			throw new Exception(ErrorType.BATTLER_MISSING.getErrorCode() + ":"
					+ ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + auth.getName());
		}
		
		battler.setPlayerStatus(1);
		battler = battlerRepository.save(battler);
		
		return new ResponseEntity<Battler>(battler, HttpStatus.OK);
	}
	
	@RequestMapping(value = "auth/arena/leave", method = RequestMethod.PUT)
	public ResponseEntity<Battler> leaveArena() throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Battler battler = battlerRepository.findByName(auth.getName());
		if (battler == null) {
			throw new Exception(ErrorType.BATTLER_MISSING.getErrorCode() + ":"
					+ ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + auth.getName());
		}
		
		battler.setPlayerStatus(0);
		battler = battlerRepository.save(battler);
		
		return new ResponseEntity<Battler>(battler, HttpStatus.OK);
	}
	
	@RequestMapping(value = "auth/battler", method = RequestMethod.GET)
	public ResponseEntity<Battler> getLoggedBattler() throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Battler battler = battlerRepository.findByName(auth.getName());
		if (battler == null) {
			throw new Exception(ErrorType.BATTLER_MISSING.getErrorCode() + ":"
					+ ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + auth.getName());
		}
		
		return new ResponseEntity<Battler>(battler, HttpStatus.OK);
	}
}
