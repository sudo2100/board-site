import { Link } from "react-router-dom";

const Header = () => {

    return(
        <div className="p-5 mb-4 text-center bg-light">
            <h1 className="mb-0">
                <Link to='/' className="text-reset text-decoration-none">My Board</Link>
            </h1>
        </div>
    )
}

export default Header;