package com.asura.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asura.web.ErrorType;
import com.asura.web.entity.Battler;
import com.asura.web.repository.BattlerRepository;

/** HTTP endpoint that deal with everything Player-related */
@RestController
public class PlayerController {
	
	@Autowired
	private BattlerRepository battlerRepository;
	
	@RequestMapping(value = "auth/myBattler", method = RequestMethod.GET)
	public ResponseEntity<Battler> getLoggedBattler() throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		Battler battler = battlerRepository.findByName(auth.getName());
		if (battler == null) {
			throw new Exception(ErrorType.BATTLER_MISSING.getErrorCode() + ":"
					+ ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + auth.getName());
		}
		
		return new ResponseEntity<Battler>(battler, HttpStatus.OK);
	}
	
	@RequestMapping(value = "auth/otherBattler", method = RequestMethod.GET)
	public ResponseEntity<Battler> getOtherBattler(@RequestParam("userId") long enemyBattlerUserId) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		Battler battler = battlerRepository.findByUserId(enemyBattlerUserId);
		if (battler == null) {
			throw new Exception(ErrorType.BATTLER_MISSING.getErrorCode() + ":"
					+ ErrorType.BATTLER_MISSING.getErrorMessage() + "Name:" + auth.getName());
		}
		
		return new ResponseEntity<Battler>(battler, HttpStatus.OK);
	}
}
