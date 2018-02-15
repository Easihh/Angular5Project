package com.asura.web.repository.custom;

import java.util.List;

import com.asura.web.entity.ArenaMatch;
import com.asura.web.entity.ArenaMatchStatus;

public interface ArenaMatchRepositoryCustom {
	
	ArenaMatch findByMatchId(String matchId);

	List<ArenaMatch> findAllByMatchStatus(ArenaMatchStatus mstatus);
}
