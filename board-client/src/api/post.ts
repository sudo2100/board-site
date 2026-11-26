import type { SearchType, Post } from "../types/post";
import api from "./api";

// 글 목록. 검색 - GET /api/posts?type=title&keyword=공지
export async function getPosts(type?: SearchType, keyword?: string): Promise<Post[]> {
    const response = await api.get<Post[]>('/posts', {params: {type, keyword}});
    return response.data;
}
