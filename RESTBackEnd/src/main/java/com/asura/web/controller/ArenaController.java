package com.asura.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asura.web.ArenaParticipant;
import com.asura.web.ErrorType;
import com.asura.web.entity.ArenaBattle;
import com.asura.web.entity.ArenaMatch;
import com.asura.web.entity.Battler;
import com.asura.web.repository.ArenaBattleRepository;
import com.asura.web.repository.ArenaMatchRepository;
import com.asura.web.repository.BattlerRepository;
import com.asura.web.utility.MatchUtility;


/** HTTP endpoint that deal with everything Arena-related */
@RestController
public class ArenaController {
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	private BattlerRepository battlerRepository;
	
	@Autowired
	private ArenaMatchRepository arenaMatchRepository;
	
	@Autowired
	private ArenaBattleRepository arenaBattleRepository;
	
	@Autowired
	private SimpMessagingTemplate template;
			
	@RequestMapping(value = "auth/arena/enter", method = RequestMethod.PUT)
	public ResponseEntity<ArenaParticipant> enterArena() throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Battler battler = battlerRepository.findByName(auth.getName());
		if (battler == null) {
			throw new Exception(ErrorType.BATTLER_MISSING.getErrorCode() + ":"
					+ ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + auth.getName());
		}
		
		battler.setPlayerStatus(1);
		battler = battlerRepository.save(battler);
		
		ArenaMatch newMatch = new ArenaMatch();
		newMatch.setMainBattler(battler);
		newMatch.setMatchStatus(1);
		newMatch.setMatchId(MatchUtility.generateMatchIdentifier(20));
		
		arenaMatchRepository.save(newMatch);
		
		ArenaParticipant participant = new ArenaParticipant(battler.getName(), newMatch.getMatchId(),
				battler.getPlayerStatus());

		template.convertAndSend("/chat", participant);
		return new ResponseEntity<ArenaParticipant>(participant, HttpStatus.OK);
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
		
		template.convertAndSend("/chat", battler);
		return new ResponseEntity<Battler>(battler, HttpStatus.OK);
	}
		
	@RequestMapping(value = "auth/arena/getMatch", method = RequestMethod.GET)
	public ResponseEntity<ArenaMatch> getParticipants(@RequestParam("matchId") String matchId) throws Exception {
		
		ArenaMatch match = arenaMatchRepository.findByMatchId(matchId);

		//List<ArenaBattle> battles = arenaBattleRepository.findByArenaMatchId(match.getId());
		
		//match.setArenaBattles(battles);
		return new ResponseEntity<ArenaMatch>(match, HttpStatus.OK);
	}
	

	@RequestMapping(value = "auth/arena/getParticipants", method = RequestMethod.GET)
	public ResponseEntity<List<ArenaParticipant>> getArenaMatch() throws Exception {
		
		List<ArenaParticipant> participants = new ArrayList<ArenaParticipant>();
		List<ArenaMatch> ongoingMatch = arenaMatchRepository.findAllByMatchStatus(1);
		
		for (ArenaMatch match : ongoingMatch) {
			ArenaParticipant temp = new ArenaParticipant(match.getMainBattler().getName(), match.getMatchId(),
					match.getMainBattler().getPlayerStatus());
			participants.add(temp);
		}

		return new ResponseEntity<List<ArenaParticipant>>(participants, HttpStatus.OK);
	}
	
	@RequestMapping(value = "auth/arena/battle", method = RequestMethod.POST)
	public ResponseEntity<ArenaMatch> arenaMatchBatle(@RequestBody Map<String, String> body) throws Exception {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		String matchId = body.get("matchId");
		
		ArenaMatch currentMatch = arenaMatchRepository.findByMatchId(matchId);
		Battler attacker = battlerRepository.findByName(auth.getName());
		
		//some battle stuff here to determine winner.pretend attacker won here so change match status for now
		
		ArenaBattle battleResult = new ArenaBattle();
		battleResult.setMatchId(currentMatch.getId());
		battleResult.setWinnerBattler(attacker);
		battleResult.setAttackerBattler(attacker);
		battleResult.setDefenderBattler(currentMatch.getMainBattler());
		
		currentMatch.addArenaBattle(battleResult);
		currentMatch.setMatchStatus(0);
		
		currentMatch = arenaMatchRepository.save(currentMatch);

		return new ResponseEntity<ArenaMatch>(currentMatch, HttpStatus.OK);
	}
}
