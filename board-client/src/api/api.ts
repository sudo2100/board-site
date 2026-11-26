import axios from "axios";

const api = axios.create({
    baseURL: '/api',
})

// 서버가 보낸 오류 문구 꺼내기 - {"message": "..."}
export function getErrorMessage(err: unknown): string{
    if(axios.isAxiosError(err)){
        return err.response?.data?.message ?? err.message;
    }
    return "알 수 없는 오류가 발생했습니다.";
}

export default api;
