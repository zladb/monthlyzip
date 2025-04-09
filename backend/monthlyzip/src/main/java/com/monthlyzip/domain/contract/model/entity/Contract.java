package com.monthlyzip.domain.contract.model.entity;

import com.monthlyzip.domain.room.model.entity.Room;
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
@Table(name = "contract")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "landlord_id", nullable = false)
    private Long landlordId;

    @Column(name = "tenant_id")
    private Long tenantId;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "monthly_rent", nullable = false)
    private Long monthlyRent;

    @Column(name = "deposit", nullable = false)
    private Long deposit;

    @Column(name = "payment_day", nullable = false)
    private Integer paymentDay;

    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "is_active_landlord")
    private Boolean isActiveLandlord=null;

    @Column(name = "is_active_tenant")
    private Boolean isActiveTenant=null;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "remaining_deposit")
    private Long remainingDeposit;

}
