package com.monthlyzip.domain.contract.repository;

import com.monthlyzip.domain.contract.model.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByLandlordId(Long landlordId);

    List<Contract> findByTenantId(Long tenantId);
}
