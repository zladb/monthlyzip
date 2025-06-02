package com.monthlyzip.domain.contract.repository;

<<<<<<< HEAD
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.member.model.entity.Member;
=======
import com.monthlyzip.domain.autotransfer.entity.AutoTransfer;
import com.monthlyzip.domain.contract.model.entity.Contract;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Optional;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByLandlordId(Long landlordId);

    List<Contract> findByTenantId(Long tenantId);

    List<Contract> findByRoom_Building_IdAndTenantIdIsNotNull(Long buildingId);
<<<<<<< HEAD
=======

    @Query("SELECT c FROM Contract c WHERE c.tenantId = :tenantId ORDER BY c.startDate DESC")
    Optional<Contract> findLatestByTenantId(@Param("tenantId") Long tenantId);

    @Query("SELECT c FROM Contract c " +
            "WHERE c.room.id = :roomId " +
            "AND c.tenantId IS NOT NULL " +
            "ORDER BY c.startDate DESC")
    Optional<Contract> findLatestByTenantIdIsNotNullAndRoomId(@Param("roomId") Long roomId);
    // 임차인 문의 등록
    Optional<Contract> findByTenantIdAndIsActiveTenantTrue(Long tenantId);
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
}
