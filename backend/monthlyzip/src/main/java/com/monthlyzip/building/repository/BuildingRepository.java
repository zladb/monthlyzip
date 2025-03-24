package com.monthlyzip.building.repository;

import com.monthlyzip.building.model.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    List<Building> findByOwnerId(Long owner_id);
}
