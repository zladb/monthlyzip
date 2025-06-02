package com.monthlyzip.domain.room.model.entity;

import com.monthlyzip.domain.building.model.entity.Building;
<<<<<<< HEAD
=======
import com.monthlyzip.domain.contract.model.entity.Contract;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
<<<<<<< HEAD
=======
import java.util.List;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

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

<<<<<<< HEAD
=======
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Contract> contracts;

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
