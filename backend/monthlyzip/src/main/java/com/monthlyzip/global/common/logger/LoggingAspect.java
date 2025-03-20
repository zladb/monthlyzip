package com.monthlyzip.global.common.logger;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.Arrays;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Pointcut("within(com.monthlyzip..controller..*)")
    public void controllerMethods() {}

    @Pointcut("within(com.monthlyzip..service..*)")
    public void serviceMethods() {}

    @Pointcut("within(com.monthlyzip..repository..*)")
    public void repositoryMethods() {}

    @Around("controllerMethods() || serviceMethods() || repositoryMethods()")
    public Object logMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        if (ApiRequestTracking.getRequestId() == null) {
            ApiRequestTracking.startTracking();
        }

        String requestId = ApiRequestTracking.getRequestId();
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().toShortString();
        String layer = getExecutionLayer(className); // 컨트롤러, 서비스, 리포지토리 판별


        // ✅ 실행 계층(Level)에 따른 들여쓰기 및 이모지 적용
        String emoji = "🔹";
        String indent = "";

        if (className.contains(".controller")) {
            emoji = "1️⃣";
            indent = "";
        } else if (className.contains(".service")) {
            emoji = "2️⃣";
            indent = "⎸   ";
        } else if (className.contains(".repository")) {
            emoji = "3️⃣";
            indent = "⎸   ⎸   ";
        }

        // ✅ API 정보 자동 추출
        String apiDescription = getApiDescription(joinPoint);

        log.info("[{}] {}{} ▶ 실행: {}", requestId, indent, emoji, apiDescription);

        // ✅ 요청 파라미터 로깅 (길이 제한 적용)
        Object[] args = joinPoint.getArgs();
        if (args.length > 0) {
            log.info("[{}] {}{} ▷ 요청: {}", requestId, indent, emoji, truncateArgs(args));
        }

        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();

            log.info("[{}] {}{} [✔️ 완료] ✅ 실행 완료: {} (⏳ {}ms)", requestId, indent, emoji, apiDescription, (endTime - startTime));

            // ✅ 반환값 로깅 (길이 제한 적용)
            if (result != null) {
                log.info("[{}] {}{} ◀ 응답: {}", requestId, indent, emoji, truncateResult(result));
            }

            return result;
        } catch (Exception e) {
            String errorMessage = String.format(
                    "\n\n ─────────────────────────────────────────────── ⚠️ [예외 발생] " +
                            "\n⏳ 요청 ID: [%s]" +
                            "\n📌 실행 위치: [%s] %s" +
                            "\n🚨 예외 메시지: %s" +
                            "\n❗ 예외 클래스: %s" +
                            "\n🛠️ 예외 발생 클래스: %s" +
                            "\n📂 발생 위치: %s:%d" +
                            "\n────────────────────────────────────────────────────────────\n",
                    requestId,
                    layer, methodName,
                    e.getMessage(),
                    e.getClass().getName(), // 예외 클래스 출력
                    e.getStackTrace()[0].getClassName(),
                    e.getStackTrace()[0].getFileName(), e.getStackTrace()[0].getLineNumber()
            );
            log.error(errorMessage); // 전체 스택 트레이스 제외하고 메시지만 출력
            throw e;
        } finally {
            ApiRequestTracking.clear();
        }
    }

    /**
     * ✅ API 설명 자동 생성 (Controller의 경우 URL과 HTTP 메서드 포함)
     */
    private String getApiDescription(ProceedingJoinPoint joinPoint) {
        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
        String className = joinPoint.getSignature().getDeclaringTypeName();

        // ✅ 실행 계층 판별
        String layer = getExecutionLayer(className);

        // ✅ 컨트롤러의 경우 URL 및 HTTP 메서드 포함
        if (className.contains(".controller")) {
            String httpMethod = getHttpMethod(method);
            String apiPath = getApiPath(method);
            return String.format("[%s] %s 요청 (%s)", layer, apiPath, httpMethod);
        }

        // ✅ 서비스 및 레포지토리는 메서드명 그대로 사용
        return String.format("[%s] %s", layer, method.getName());
    }

    /**
     * ✅ 실행 계층 판별 (Controller, Service, Repository)
     */
    private String getExecutionLayer(String className) {
        if (className.contains(".controller")) return "Controller";
        if (className.contains(".service")) return "Service";
        if (className.contains(".repository")) return "Repository";
        return "Unknown";
    }

    /**
     * ✅ HTTP 메서드(@GetMapping, @PostMapping 등) 자동 추출
     */
    private String getHttpMethod(Method method) {
        if (method.isAnnotationPresent(GetMapping.class)) return "GET";
        if (method.isAnnotationPresent(PostMapping.class)) return "POST";
        if (method.isAnnotationPresent(PatchMapping.class)) return "PATCH";
        if (method.isAnnotationPresent(DeleteMapping.class)) return "DELETE";
        if (method.isAnnotationPresent(RequestMapping.class)) {
            RequestMapping mapping = method.getAnnotation(RequestMapping.class);
            return Arrays.stream(mapping.method())
                    .map(Enum::name)
                    .findFirst()
                    .orElse("UNKNOWN");
        }
        return "UNKNOWN";
    }

    /**
     * ✅ API URL 자동 추출
     */
    private String getApiPath(Method method) {
        if (method.isAnnotationPresent(GetMapping.class)) {
            return Arrays.toString(method.getAnnotation(GetMapping.class).value());
        }
        if (method.isAnnotationPresent(PostMapping.class)) {
            return Arrays.toString(method.getAnnotation(PostMapping.class).value());
        }
        if (method.isAnnotationPresent(PatchMapping.class)) {
            return Arrays.toString(method.getAnnotation(PatchMapping.class).value());
        }
        if (method.isAnnotationPresent(DeleteMapping.class)) {
            return Arrays.toString(method.getAnnotation(DeleteMapping.class).value());
        }
        if (method.isAnnotationPresent(RequestMapping.class)) {
            return Arrays.toString(method.getAnnotation(RequestMapping.class).value());
        }
        return "API";
    }

    /**
     * ✅ 요청 파라미터 및 응답 결과가 너무 길어질 경우 로그 출력 최적화
     */
    private String truncateArgs(Object[] args) {
        return Arrays.toString(args).length() > 500 ? Arrays.toString(args).substring(0, 500) + "..." : Arrays.toString(args);
    }

    private String truncateResult(Object result) {
        String resultString = result.toString();
        return resultString.length() > 500 ? resultString.substring(0, 500) + "..." : resultString;
    }
}
