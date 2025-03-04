import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataApi } from './../utils/fetchDataApi';
import UserCard from "./UserCard";
import "../styles/RandomUser.css";
import RandomUserCard from "./RandomUserCard";

const RandomUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getDataApi("randomuser", auth.token);
                console.log(res);
                if (!res.statusText === "OK") {
                    throw new Error("Failed to fetch users");
                }
                const data = await res.data.randomUsers;
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [auth.token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="randomuser">
            {users?.length > 0 ? (
                <ul className="randomusers-list">
                    {users.filter(user => user._id !== auth.user._id).map((user, index) => (
                        <RandomUserCard key={index} user={user} />
                    ))}

                </ul>
            ) : (
                <p className="randomusernotfound">No users found</p>
            )}
        </div>
    );
}

export default RandomUser