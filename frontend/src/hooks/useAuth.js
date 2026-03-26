import { useState, useEffect } from "react";
import { getMe } from "../services/auth";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getMe();
                setUser(res.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser()
    }, []);  // empty array = runs once when component mounts

    return {user,loading};
}