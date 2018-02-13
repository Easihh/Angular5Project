package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="ARENA_BATTLES")
@NamedQueries({
	@NamedQuery(name="ArenaBattle.findByArenaMatchId",query="select a from ArenaBattle a where a.matchId=:matchId")
})
public class ArenaBattle {
	
	
	public ArenaBattle() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ARENA_BATTLES_SEQ")
	@SequenceGenerator(name = "ARENA_BATTLES_SEQ",sequenceName = "ARENA_BATTLES_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="ARENA_MATCH_ID")
	private long matchId;
	
	@OneToOne
	@JoinColumn(name="ATTACKER_BATTLER_ID", referencedColumnName="ID")
	private Battler attackerBattler;
	
	@OneToOne
	@JoinColumn(name="DEFENDER_BATTLER_ID", referencedColumnName="ID")
	private Battler defenderBattler;
	
	@OneToOne
	@JoinColumn(name="WINNER_BATTLER_ID", referencedColumnName="ID")
	private Battler winnerBattler;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public long getMatchId() {
		return matchId;
	}

	public void setMatchId(long matchId) {
		this.matchId = matchId;
	}

	public Battler getAttackerBattler() {
		return attackerBattler;
	}

	public void setAttackerBattler(Battler attackerBattler) {
		this.attackerBattler = attackerBattler;
	}

	public Battler getDefenderBattler() {
		return defenderBattler;
	}

	public void setDefenderBattler(Battler defenderBattler) {
		this.defenderBattler = defenderBattler;
	}

	public Battler getWinnerBattler() {
		return winnerBattler;
	}

	public void setWinnerBattler(Battler winnerBattler) {
		this.winnerBattler = winnerBattler;
	}
	
	
}
