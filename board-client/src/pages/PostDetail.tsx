import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Post } from "../types/post";
import { getPost } from "../api/post";
import { getErrorMessage } from "../api/api";
import dayjs from "dayjs";

const PostDetail = () => {
  const { id } = useParams();                 // /posts/3 → "3"
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPost(Number(id))  // 문자를 숫자형으로 변환
      .then(setPost)
      .catch(err => setError(getErrorMessage(err)));   // 없는 글 → "not found: 3"
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p className="text-muted">불러오는 중…</p>;

    return(
        <div className="mx-auto" style={{ maxWidth: 640 }}>
            <article className="border rounded p-4">
                <header className="mb-4">
                <h2 className="fw-bolder mb-1">{post.title}</h2>
                <div className="text-muted fst-italic">
                    {post.writer} . {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
                </div>
                </header>
                <section className="mb-5">
                <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                </section>

                <Link to="/posts" className="btn btn-secondary btn-sm">목록</Link>
                {/* 수정 · 삭제 버튼은 로그인을 만든 뒤 추가한다 */}
            </article>
        </div>
    )
}

export default PostDetail;