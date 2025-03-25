package com.monthlyzip.domain.room.repository;

import com.monthlyzip.domain.room.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByBuildingId(Long propertyId);
}
