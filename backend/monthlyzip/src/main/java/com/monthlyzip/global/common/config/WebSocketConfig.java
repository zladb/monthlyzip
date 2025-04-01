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
        // 순수 WebSocket 클라이언트용 (ex. Postman, WebSocket King)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");

        // 브라우저 SockJS 클라이언트용
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    // 메시지 브로커 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");              // 메시지 받을 prefix
        registry.setApplicationDestinationPrefixes("/app"); // 메시지 보낼 prefix
    }
}
