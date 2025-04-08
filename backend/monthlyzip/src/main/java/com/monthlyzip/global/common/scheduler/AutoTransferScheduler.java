package com.monthlyzip.global.common.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AutoTransferScheduler {

    private final AutoTransferExecutor autoTransferExecutor;

    // 매일 9시에 실행
//    @Scheduled(cron = "0 0 9 * * *")
    // 매 10분마다 실행
//    @Scheduled(cron = "0 */10 * * * *")
    public void runAutoTransfers() {
        log.info("[자동이체 스케줄러] 실행 시작");
        autoTransferExecutor.executeTransfersForToday();
        log.info("[자동이체 스케줄러] 실행 완료");
    }
}