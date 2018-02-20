package com.asura.web.service;

import org.springframework.stereotype.Service;

import com.asura.web.entity.Battler;

@Service
public class ArenaService {

	public Battler determineMatchWinner(Battler attacker, Battler defender) {
		return attacker.getAttack() > defender.getDefense() ? attacker : defender;
	}

	public StringBuilder createMatchCombatLog(Battler winner, Battler loser) {
		StringBuilder sb = new StringBuilder();
		
		sb.append(winner.getName() + " and " + loser.getName() + " ready their weapon.");
		sb.append("<br>");
		sb.append("<br>");
		sb.append(loser.getName() + " attacks!");
		sb.append("<br>");
		sb.append(winner.getName() + " received 9999 damage!");
		sb.append("<br>");
		sb.append(winner.getName() + " retaliates!");
		sb.append("<br>");
		sb.append(loser.getName() + " received 9999 damage!");
		sb.append("<br>");
		sb.append("<br>");
		sb.append(loser.getName() + " has been **defeated**.");
		
		return sb;
	}
	
}
