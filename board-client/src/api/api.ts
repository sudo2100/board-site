import axios from "axios";

const api = axios.create({
    baseURL: '/api',
})

// 응답 인터셉터 — 로그인이 풀려(세션 만료) 401이면 로그인 화면으로
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthApi = error.config?.url?.startsWith('/auth');   // 로그인 실패 401은 제외
    if (axios.isAxiosError(error) && error.response?.status === 401 && !isAuthApi) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);


// 서버가 보낸 오류 문구 꺼내기 - {"message": "..."}
export function getErrorMessage(err: unknown): string{
    if(axios.isAxiosError(err)){
        return err.response?.data?.message ?? err.message;
    }
    return "알 수 없는 오류가 발생했습니다.";
}

export default api;
