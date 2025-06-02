package com.monthlyzip.domain.notice.repository;

import com.monthlyzip.domain.notice.model.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findByBuildingId(Long buildingId);
<<<<<<< HEAD
=======

    List<Notice> findByBuildingIdIn(List<Long> buildingIds);

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
}
