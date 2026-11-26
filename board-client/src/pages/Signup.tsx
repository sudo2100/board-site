import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { AuthForm } from "../types/auth";
import { signup } from "../api/auth";
import { getErrorMessage } from "../api/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<AuthForm>({ username: '', password: '' });  // 입력값
  const [error, setError] = useState('');         // 오류 문구 (빈 문자열이면 숨김)

  // input의 name(username · password)으로 어느 칸인지 구분 → 함수 하나로 두 칸 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value })); // 나머지 칸은 그대로 두고 이 칸만 바꾼다
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();                                     // 페이지 새로고침 막기
    try {
      await signup(form);                                   // POST /api/auth/signup
      // 로그인 화면으로 — state.signup으로 "회원가입이 완료되었습니다" 알림을 띄운다
      navigate('/login', { replace: true, state: { signup: true } });
    } catch (err) {
      setError(getErrorMessage(err));                       // 서버 400 메시지 — "이미 사용 중인 아이디입니다."
    }
  };

    return(
       <div className="mx-auto" style={{ maxWidth: 420 }}>
        <h2 className="mb-4">회원가입</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">아이디</label>
                {/* name은 AuthForm 필드 이름과 같게 · maxLength는 서버 users.username 길이(20)에 맞춤 */}
                <input id="username" name="username" className="form-control" maxLength={20}
                        value={form.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">비밀번호</label>
                <input id="password" name="password" type="password" className="form-control"
                        value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">가입하기</button>
        </form>
        <p className="text-center mt-3">이미 회원이면 <Link to="/login">로그인</Link></p>
    </div>
    )
}

export default Signup;