package com.monthlyzip.domain.autotransfer.entity;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "auto_transfer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AutoTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1:1 관계 - Contract
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_auto_transfer_contract"))
    private Contract contract;

    // 1:1 관계 - 세입자
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false, unique = true)
    private Member tenant;

    // 1:1 관계 - 출금 계좌
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account", referencedColumnName = "account_no", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_auto_transfer_from_account"))
    private Member fromAccount;

    // N:1 관계 - 입금 계좌
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_account", referencedColumnName = "account_no", nullable = false,
            foreignKey = @ForeignKey(name = "fk_auto_transfer_to_account"))
    private Member toAccount;

    @Column(nullable = false)
    private Long amount;

    @Column(name = "payment_day", nullable = false)
    private Short paymentDay;

    @Column(name = "start_month", nullable = false)
    private LocalDate startMonth;

    @Column(name = "end_month", nullable = false)
    private LocalDate endMonth;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
