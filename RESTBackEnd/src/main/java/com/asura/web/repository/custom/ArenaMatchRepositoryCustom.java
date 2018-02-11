package com.asura.web.repository.custom;

import java.util.List;

import com.asura.web.entity.ArenaMatch;

public interface ArenaMatchRepositoryCustom {
	
	ArenaMatch findByMatchId(String matchId);

	List<ArenaMatch> findAllByMatchStatus(long mstatus);
}
