import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../redux/auth/authThunk.js";

const Nav = () => {
    const usersState = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logoutThunk({token: usersState?.accessToken, dispatch, navigate}));
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-5">
            <Link to={"/"}>Home</Link>
            {usersState ? (
                <>
                    <p className="p-0 m-0">Hi, {usersState.username}</p>
                    <button onClick={() => handleLogout()}>Logout</button>
                </>
            ) : (
                <>
                    <Link className="" to={"/login"} replace={true}>
                        Login
                    </Link>
                    <Link to={"/register"} replace={true}>
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default Nav;
