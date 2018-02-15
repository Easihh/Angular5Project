package com.asura.web.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="ARENA_MATCHES")
@NamedQueries({
	@NamedQuery(name="ArenaMatch.findByMatchId",query="select a from ArenaMatch a where a.matchId=:matchId"),
	@NamedQuery(name="ArenaMatch.findAllByMatchStatus",query="select a from ArenaMatch a where a.matchStatus=:mstatus")
})
public class ArenaMatch {
	
	public ArenaMatch() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ARENA_MATCHES_SEQ")
	@SequenceGenerator(name = "ARENA_MATCHES_SEQ",sequenceName = "ARENA_MATCHES_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="MATCH_ID")
	private String matchId;
	
	@OneToOne
	@JoinColumn(name="MAIN_BATTLER_ID", referencedColumnName="ID")
	private Battler mainBattler;
	
	@Column(name="MATCH_STATUS")
	@Enumerated(EnumType.ORDINAL)
	private ArenaMatchStatus matchStatus;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMatchId() {
		return matchId;
	}

	public void setMatchId(String matchId) {
		this.matchId = matchId;
	}

	public Battler getMainBattler() {
		return mainBattler;
	}

	public void setMainBattler(Battler mainBattler) {
		this.mainBattler = mainBattler;
	}
	
	public ArenaMatchStatus getMatchStatus() {
		return matchStatus;
	}

	public void setMatchStatus(ArenaMatchStatus matchStatus) {
		this.matchStatus = matchStatus;
	}

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "ARENA_MATCH_ID")
	private List<ArenaBattle> arenaBattles = new ArrayList<ArenaBattle>();

	public List<ArenaBattle> getArenaBattles() {
		return arenaBattles;
	}
	
	public void addArenaBattle(ArenaBattle battle) {
		this.arenaBattles.add(battle);
	}

}
