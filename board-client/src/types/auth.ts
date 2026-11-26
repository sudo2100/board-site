
// 회원가입, 로그인 폼
export interface AuthForm{
    username: string;
    password: string;
}

// 로그인 사용자 정보 (서버 UserInfoResponse)
export interface UserInfo {
  username: string;
  role: string;        // 'USER' | 'ADMIN'
}