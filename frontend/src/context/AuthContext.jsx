import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children, }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    async function checkAuth() {
        try {
            const data = await getCurrentUser();
            setUser(data.user);
        }
        catch {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    async function login(email, password) {

        const data = await loginUser({
            email,
            password,
        });

        setUser(data.user);
        return data.user;
    }


    async function register(name, email, password) {

        const data = await registerUser({
            name,
            email,
            password,
        });

        setUser(data.user);
        return data.user;
    }


    async function logout() {
        await logoutUser();
        setUser(null);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext);
}