import { useSearchParams, Link } from "react-router-dom";
import type { SearchType, Post } from "../types/post";
import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import { getPosts } from "../api/post";
import dayjs from "dayjs";

const PostList = () => {
      // 주소의 ?type=title&keyword=가입 읽기
  const [searchParams, setSearchParams] = useSearchParams();
  const type = (searchParams.get('type') ?? 'title') as SearchType;
  const keyword = searchParams.get('keyword') ?? '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // 검색 폼 입력값
  const [inputType, setInputType] = useState<SearchType>(type);
  const [inputKeyword, setInputKeyword] = useState(keyword);

  // 주소의 type · keyword가 바뀔 때마다 다시 불러온다
  useEffect(() => {
    getPosts(type, keyword)
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, [type, keyword]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputKeyword.trim()) {
      setSearchParams({ type: inputType, keyword: inputKeyword.trim() });
    } else {
      setSearchParams({});            // 검색어가 없으면 전체 목록
    }
  };

  const handleReset = () => {
    setInputType('title');
    setInputKeyword('');
    setSearchParams({});
  };

    return(
        <>
      {/* 검색 */}
      <form onSubmit={handleSearch} className="row g-2 justify-content-end mb-3">
        <div className="col-auto">
          <select className="form-select" value={inputType}
                  onChange={e => setInputType(e.target.value as SearchType)}>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="writer">글쓴이</option>
          </select>
        </div>
        <div className="col-auto">
          <input className="form-control" placeholder="검색어를 입력하세요"
                 value={inputKeyword} onChange={e => setInputKeyword(e.target.value)} />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-outline-primary me-1">검색</button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>초기화</button>
        </div>
      </form>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>전체 {posts.length}건</span>
        <Link to="/posts/new" className="btn btn-primary">글쓰기</Link>
      </div>

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th style={{ width: 80 }}>번호</th>
            <th>제목</th>
            <th style={{ width: 120 }}>글쓴이</th>
            <th style={{ width: 170 }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
              <td>{post.writer}</td>
              <td>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}</td>
            </tr>
          ))}
          {!isLoading && posts.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                {keyword ? '검색 결과가 없습니다.' : '등록된 글이 없습니다.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
    )
}

export default PostList;