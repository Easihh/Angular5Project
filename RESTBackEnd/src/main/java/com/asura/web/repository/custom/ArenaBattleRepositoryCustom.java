package com.asura.web.repository.custom;

import java.util.List;

import com.asura.web.entity.ArenaBattle;

public interface ArenaBattleRepositoryCustom {
	
	List<ArenaBattle> findByArenaMatchId(long arenaMatchId);
}
