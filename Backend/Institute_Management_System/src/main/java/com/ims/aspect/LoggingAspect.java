package com.ims.aspect;

import com.ims.service.impl.LoggerClientService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Aspect
@Component
public class LoggingAspect {

    @Autowired
    private LoggerClientService loggerClient;

    private String getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return auth.getName() + " (" + auth.getAuthorities() + ")";
        }
        return "Anonymous";
    }

    @Before("execution(* com.ims.controller..*(..))")
    public void logBefore(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String user = getCurrentUser();
        loggerClient.logToNetService("INFO", "[" + user + "] Executing " + className + "." + methodName);
    }

    @AfterReturning(pointcut = "execution(* com.ims.controller..*(..))", returning = "result")
    public void logAfter(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String user = getCurrentUser();
        loggerClient.logToNetService("INFO", "[" + user + "] Completed " + className + "." + methodName);
    }

    @AfterThrowing(pointcut = "execution(* com.ims.controller..*(..))", throwing = "error")
    public void logError(JoinPoint joinPoint, Throwable error) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String user = getCurrentUser();
        loggerClient.logToNetService("ERROR",
                "[" + user + "] Exception in " + className + "." + methodName + ": " + error.getMessage());
    }
}