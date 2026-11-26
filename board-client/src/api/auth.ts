import api from "./api";
import type { AuthForm, UserInfo } from "../types/auth";

// 회원 가입
export async function signup(form:AuthForm): Promise<void> {
    await api.post('/auth/signup', form);
}

// 쿠키 받기
export async function loadCsrf(): Promise<void> {
    await api.get('/auth/me');
}

// 로그인 — POST /api/auth/login → 서버가 세션에 저장 · 쿠키 발급
export async function login(form: AuthForm): Promise<UserInfo> {
  const response = await api.post<UserInfo>('/auth/login', form);
  return response.data;
}

// 로그아웃 — POST /api/auth/logout → 서버 세션 삭제
export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

// 내 정보 — GET /api/auth/me → 200(로그인) · 204(로그인 안 함)
export async function me(): Promise<UserInfo | null> {
  const response = await api.get<UserInfo>('/auth/me');
  return response.status === 200 ? response.data : null;
}