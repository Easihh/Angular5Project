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
@Table(name="BATTLES")
@NamedQueries({
	@NamedQuery(name="Battle.findByDefenderId",query="select b from Battle b where b.defenderBattlerId=:defenders")
})
public class Battle {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BATTLES_SEQ")
	@SequenceGenerator(name = "BATTLES_SEQ",sequenceName = "BATTLES_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="ATTACKER_BATTLER_ID")
	private Long attackerBattlerId;
	
	@Column(name="DEFENDER_BATTLER_ID")
	private Long defenderBattlerId;
	
	@Column(name="WINNER_BATTLER_ID")
	private Long winnerBattlerId;
}
