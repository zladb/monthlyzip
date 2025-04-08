package com.monthlyzip.global.common.scheduler;

import com.monthlyzip.domain.autotransfer.entity.AutoTransfer;
import com.monthlyzip.domain.autotransfer.repository.AutoTransferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AutoTransferExecutor {

    private final AutoTransferRepository autoTransferRepository;

    public void executeTransfersForToday() {
        LocalDate today = LocalDate.now();
        short todayDay = (short) today.getDayOfMonth();

        // 오늘 이체일인 자동이체 목록 조회
        List<AutoTransfer> transfers = autoTransferRepository.findAllByPaymentDay(todayDay);

        for (AutoTransfer transfer : transfers) {
            if (isEligibleForTransfer(today, transfer)) {
                log.info("[자동이체 대상] ID: {}, 금액: {}", transfer.getId(), transfer.getAmount());

                // 송금 API 호출 예정
                // 송금 부분 구현 할 부분입니다.

            } else {
                log.debug("[자동이체 제외] ID: {} (기간 외)", transfer.getId());
            }
        }
    }

    private boolean isEligibleForTransfer(LocalDate today, AutoTransfer transfer) {
        LocalDate start = transfer.getStartMonth();
        LocalDate end = transfer.getEndMonth();

        int year = today.getYear();
        int month = today.getMonthValue();

        int startYM = start.getYear() * 100 + start.getMonthValue();
        int endYM = end.getYear() * 100 + end.getMonthValue();
        int todayYM = year * 100 + month;

        return todayYM >= startYM && todayYM <= endYM;
    }
}