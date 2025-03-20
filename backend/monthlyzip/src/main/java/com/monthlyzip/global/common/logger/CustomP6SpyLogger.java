package com.monthlyzip.global.common.logger;

import com.p6spy.engine.spy.appender.MessageFormattingStrategy;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomP6SpyLogger implements MessageFormattingStrategy {

    private static final String SQL_LOG_SEPARATOR = "------------------------ SQL 실행 %s ------------------------";
    private static final String SQL_LOG_ICON = "🐬 ";

    @Override
    public String formatMessage(int connectionId, String now, long elapsed, String category,
                                String prepared, String sql, String url) {
        if (sql == null || sql.trim().isEmpty()) {
            return "";
        }

        // ✅ 실행 시간 포맷팅
        String currentTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        // ✅ SQL 실행 시작/종료 구분 추가
        return String.format("%n%n" + SQL_LOG_SEPARATOR + "%n%s%s | 실행시간: %dms | Connection ID: %d%n%s%n" + SQL_LOG_SEPARATOR +"%n",
                "시작", SQL_LOG_ICON, currentTime, elapsed, connectionId, sql, "종료");
    }
}
