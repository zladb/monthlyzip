package com.monthlyzip.domain.building.model.entity;

import com.monthlyzip.member.model.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "building")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // ✅ 지연 로딩 설정
    @JoinColumn(name = "owner_id", nullable = false)
    private Member owner;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "building_name", length = 100)
    private String buildingName;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
