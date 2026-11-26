// 서버 PostResponse와 같은 모양
export interface Post{
    id: number;
    title: string;
    content: string;
    writer: string;
    createdAt: string;
    updatedAt: string;
}

// 검색 유형
export type SearchType = 'title' | 'content' | 'writer'