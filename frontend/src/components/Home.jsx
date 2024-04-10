import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllUsers, deleteUser } from "../redux/users/usersThunk.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersState = useSelector((state) => state.auth.login.currentUser);
    const userAll = useSelector((state) => state.users.users.allUsers);
    const errorMessage = useSelector((state) => state.users.deleteUser.message);

    useEffect(() => {
        if (!usersState) {
            navigate("/login");
        }
        dispatch(fetchAllUsers(usersState?.accessToken));
    }, []);

    const handleDeleteUser = (id) => {
        dispatch(
            deleteUser({
                id,
                token: usersState?.accessToken,
                dispatch,
            })
        );
    };

    return (
        <div className="d-flex flex-column justify-content-between align-items-center mt-5">
            <h1>Home</h1>

            <div className="d-flex justify-content-center align-items-center">
                {userAll?.map((user, index) => {
                    return (
                        <div key={index} className="ms-5">
                            <h5 className="p-3 rounded rounded-5 bg-success text-white">
                                {user.username}
                            </h5>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(user._id)}
                            >
                                delete
                            </button>
                        </div>
                    );
                })}
            </div>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Home;
