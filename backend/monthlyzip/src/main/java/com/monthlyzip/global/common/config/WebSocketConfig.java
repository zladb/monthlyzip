package com.monthlyzip.global.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 클라이언트가 WebSocket 연결을 시도할 endpoint 지정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")         // ex: /ws로 연결
                .setAllowedOrigins("*")     // 배포 시에는 도메인 제한 권장
                .withSockJS();              // SockJS fallback
    }

    // 메시지 브로커 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");              // 메시지 받을 prefix
        registry.setApplicationDestinationPrefixes("/app"); // 메시지 보낼 prefix
    }
}
