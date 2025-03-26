package com.monthlyzip.domain.room.model.entity;

import com.monthlyzip.domain.building.model.entity.Building;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "room",
        uniqueConstraints = @UniqueConstraint(name = "room_property_unique", columnNames = {"property_id", "detail_address"})
)
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Building building;

    @Column(name = "detail_address", nullable = false, length = 20)
    private String detailAddress;

    @Column(name = "area")
    private Long area;

    @Column(name = "is_occupied", nullable = false)
    private Boolean isOccupied = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
