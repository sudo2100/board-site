import { Link } from "react-router-dom";

const Home = () => {

    return(
        <div className="text-center py-4">
            <p className="lead">Spring Boot REST API + React로 만든 게시판입니다.</p>
            <p className="text-muted">전체 글 0개</p>
            <div className="d-flex justify-content-center gap-2 mt-4">
                <Link to="/posts" className="btn btn-primary">글목록 가기</Link>
                <Link to="/posts/new" className="btn btn-primary">글등록 가기</Link>
            </div>
        </div>
    )
}

export default Home;