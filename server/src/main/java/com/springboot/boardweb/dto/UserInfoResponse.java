package com.springboot.boardweb.dto;

import org.springframework.security.core.Authentication;

// 화면에 보여 줄 로그인 사용자 정보
public record UserInfoResponse(String username, String role) {
    // 시큐리티의 로그인 정보 → 응답 DTO
    public static UserInfoResponse from(Authentication authentication) {
        boolean admin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return new UserInfoResponse(authentication.getName(), admin ? "ADMIN" : "USER");
    }
}
