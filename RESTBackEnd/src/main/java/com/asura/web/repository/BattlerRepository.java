package com.asura.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.asura.web.entity.Battler;
import com.asura.web.repository.custom.BattlerRepositoryCustom;

public interface BattlerRepository extends CrudRepository<Battler, Long>, BattlerRepositoryCustom {

}
