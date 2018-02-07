package com.asura.web.repository.custom;

import com.asura.web.entity.Battler;

public interface BattlerRepositoryCustom {
	
	Battler findByName(String name);
	
}
