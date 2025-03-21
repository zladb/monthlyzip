package com.monthlyzip.global.common.logger;

import com.p6spy.engine.spy.appender.MessageFormattingStrategy;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomP6SpyLogger implements MessageFormattingStrategy {

    private static final String SQL_LOG_SEPARATOR = "────────────────────── 🐬 SQL 실행 %s ────────────────────────";
    private static final String SQL_LOG_ICON = "";

    @Override
    public String formatMessage(int connectionId, String now, long elapsed, String category,
                                String prepared, String sql, String url) {
        if (sql == null || sql.trim().isEmpty()) {
            return "";
        }

        // ✅ 실행 시간 포맷팅
        String currentTime = new SimpleDateFormat("📅 yyyy-MM-dd HH:mm:ss").format(new Date());

        // ✅ SQL 실행 시작/종료 구분 추가
        return String.format(
                "%n%n" + SQL_LOG_SEPARATOR +
                        "%n%s%s | ⌛ 실행시간: %dms | 🔗 Connection ID: %d" +
                        "%s%n" + SQL_LOG_SEPARATOR + "%n",
                "시작", SQL_LOG_ICON, currentTime, elapsed, connectionId, formatSQL(sql), "종료"
        );
    }

    /**
     * ✅ SQL을 보기 좋게 정리하는 메서드
     */
    private String formatSQL(String sql) {
        return sql.replaceAll("\\s+", " ") // 연속된 공백을 하나로 변경
                .replaceAll("(?i)select", "\n🔹 SELECT")
                .replaceAll("(?i)from", "\n  🔹 FROM")
                .replaceAll("(?i)where", "\n  🔹 WHERE")
                .replaceAll("(?i)insert into", "\n🔹 INSERT INTO")
                .replaceAll("(?i)values", "\n  🔹 VALUES")
                .replaceAll("(?i)update", "\n🔹 UPDATE")
                .replaceAll("(?i)set", "\n  🔹 SET")
                .replaceAll("(?i)delete from", "\n🔹 DELETE FROM");
    }
}
