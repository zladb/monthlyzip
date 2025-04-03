package com.monthlyzip.domain.notice.repository;

import com.monthlyzip.domain.notice.model.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findByBuildingId(Long buildingId);

    List<Notice> findByBuildingIdIn(List<Long> buildingIds);

}
