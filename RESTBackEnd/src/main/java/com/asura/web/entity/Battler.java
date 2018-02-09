package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="BATTLERS")
@NamedQueries({
	@NamedQuery(name="Battler.findByName",query="select b from Battler b where b.name=:name")
})
public class Battler {
	
	public Battler() {}//default construct required
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BATTLERS_SEQ")
	@SequenceGenerator(name = "BATTLERS_SEQ",sequenceName = "BATTLERS_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="USER_ID")
	private long userId;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="PLAYER_STATUS")
	private long playerStatus;
	
	@Column(name="BATTLER_LEVEL")
	private long level;
	
	@Column(name="CURRENT_EXP")
	private long currentExp;
	
	@Column(name="NEXT_LVL")
	private long nextLvl;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getLevel() {
		return level;
	}

	public void setLevel(long level) {
		this.level = level;
	}

	public long getCurrentExp() {
		return currentExp;
	}

	public void setCurrentExp(long currentExp) {
		this.currentExp = currentExp;
	}

	public long getNextLvl() {
		return nextLvl;
	}

	public void setNextLvl(long nextLvl) {
		this.nextLvl = nextLvl;
	}
	
	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public long getPlayerStatus() {
		return playerStatus;
	}

	public void setPlayerStatus(long playerStatus) {
		this.playerStatus = playerStatus;
	}
}
