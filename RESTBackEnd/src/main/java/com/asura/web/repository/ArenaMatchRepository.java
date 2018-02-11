package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.ArenaMatch;
import com.asura.web.repository.custom.ArenaMatchRepositoryCustom;

public interface ArenaMatchRepository extends CrudRepository<ArenaMatch, Long> , ArenaMatchRepositoryCustom{
	
}
