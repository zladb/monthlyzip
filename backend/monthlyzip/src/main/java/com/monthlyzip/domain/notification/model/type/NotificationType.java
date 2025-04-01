package com.monthlyzip.domain.notification.model.type;

public enum NotificationType {
    NEW_NOTICE("📢 새로운 공지사항이 도착했습니다."),
    TEST("🧪 테스트 알림입니다."),
    PAYMENT_DUE("💸 이번 달 납부일 입니다."),
    PAYMENT_MISSED("❗️납부가 아직 완료되지 않았어요."),
    CONTRACT_EXPIRING("📄 곧 계약이 만료됩니다. 연장 여부를 확인해주세요."),
    INQUIRY_RESPONSE("💬 문의하신 내용에 답변이 등록되었습니다.");

    private final String defaultMessage;

    NotificationType(String defaultMessage) {
        this.defaultMessage = defaultMessage;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
