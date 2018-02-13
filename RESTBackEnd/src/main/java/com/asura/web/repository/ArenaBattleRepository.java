package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.ArenaBattle;
import com.asura.web.repository.custom.ArenaBattleRepositoryCustom;

public interface ArenaBattleRepository extends CrudRepository<ArenaBattle, Long> , ArenaBattleRepositoryCustom{
	
}
