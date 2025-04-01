package com.monthlyzip.domain.contract.repository;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.member.model.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByLandlordId(Long landlordId);

    List<Contract> findByTenantId(Long tenantId);

    List<Contract> findByRoom_Building_IdAndTenantIdIsNotNull(Long buildingId);
}
