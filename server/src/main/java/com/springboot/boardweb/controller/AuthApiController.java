package com.springboot.boardweb.controller;

import com.springboot.boardweb.dto.AddUserRequest;
import com.springboot.boardweb.dto.LoginRequest;
import com.springboot.boardweb.dto.UserInfoResponse;
import com.springboot.boardweb.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthApiController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    // 로그인 정보를 세션에 저장하는 도구
    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    // ① 회원가입 → POST /api/auth/signup (6장 save() 재사용)
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody AddUserRequest request) {
        userService.save(request);                          // 중복 아이디면 400 (2단원)
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // ② CSRF 쿠키 받기 → GET /api/auth/me (7단원에서 '내 정보'로 완성)
    @GetMapping("/me")
    public ResponseEntity<Void> me(CsrfToken csrfToken) {
        csrfToken.getToken();          // 토큰을 한 번 읽으면 XSRF-TOKEN 쿠키가 응답에 실린다
        return ResponseEntity.noContent().build();          // 204
    }

    // 로그인
    // ② 로그인 → POST /api/auth/login → 세션에 저장
    @PostMapping("/login")
    public ResponseEntity<UserInfoResponse> login(@RequestBody LoginRequest request,
                                                  HttpServletRequest httpRequest,
                                                  HttpServletResponse httpResponse) {
        // 아이디 · 비밀번호 확인 — 틀리면 BadCredentialsException → 401 (2단원)
        Authentication authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(
                        request.getUsername(), request.getPassword()));

        // 세션 고정 공격 방지 — 로그인 전에 쓰던 세션 ID를 새 것으로
        if (httpRequest.getSession(false) != null) {
            httpRequest.changeSessionId();
        }

        // 로그인 정보를 SecurityContext에 담아 세션에 저장
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, httpRequest, httpResponse);

        return ResponseEntity.ok(UserInfoResponse.from(authentication));
    }

}
