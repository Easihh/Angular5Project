package com.asura.web;

/* Class that represent a battler arena participant, this class only return basic data 
 * since its sent to all player via websocket.
 */
public class ArenaParticipant {
	
	private String name;
	private String matchId;
	private long playerStatus;
	
	public ArenaParticipant(String name, String matchId, long playerStatus) {
		this.name = name;
		this.matchId = matchId;
		this.playerStatus = playerStatus;
	}
	
	public String getName() {
		return name;
	}

	public String getMatchId() {
		return matchId;
	}
	
	public long getPlayerStatus() {
		return playerStatus;
	}
}
