import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../api/post";
import { getErrorMessage } from "../api/api";

const Home = () => {
    const [postCount, setPostCount] = useState(0);
    const [error, setError] = useState('');

    // 화면이 처음 그려질 때 한 번 — 전체 글 수
    useEffect(() => {
        getPosts()
        .then(posts => setPostCount(posts.length))
        .catch(err => setError(getErrorMessage(err)));   // 실패하면 이유를 화면에
    }, []);

    return(
        <div className="text-center py-4">
            <p className="lead">Spring Boot REST API + React로 만든 게시판입니다.</p>
            <p className="text-muted">전체 글 {postCount}개</p>
            {error && <p className="text-danger">불러오기 실패: {error}</p>}
            <div className="d-flex justify-content-center gap-2 mt-4">
                <Link to="/posts" className="btn btn-primary">글목록 가기</Link>
                <Link to="/posts/new" className="btn btn-primary">글등록 가기</Link>
            </div>
        </div>
    )
}

export default Home;