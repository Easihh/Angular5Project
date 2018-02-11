package com.asura.web.repository.custom;

import java.util.List;

import com.asura.web.entity.Battler;

public interface BattlerRepositoryCustom {
	
	Battler findByName(String name);
	
	Battler findByUserId(long userId);
	
	List<Battler> findByPlayerStatus(long status);
	
}
