package com.monthlyzip.domain.contract.repository;

import com.monthlyzip.domain.contract.model.entity.Contract;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByLandlordId(Long landlordId);

    List<Contract> findByTenantId(Long tenantId);

    List<Contract> findByRoom_Building_IdAndTenantIdIsNotNull(Long buildingId);

    @Query("SELECT c FROM Contract c WHERE c.tenantId = :tenantId ORDER BY c.startDate DESC")
    Optional<Contract> findLatestByTenantId(@Param("tenantId") Long tenantId);
}
