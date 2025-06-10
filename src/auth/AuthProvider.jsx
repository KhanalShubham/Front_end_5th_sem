// import { useState } from "react";

// export const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const login = (userData, token) => {
//         setLoading(true);
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//         setLoading(false);
//     };
//     const logout = () => {
//         setLoading(true);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//         setLoading(false);
//     }
// };

// useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     if (token && storedUser) {
//         try {
//             setUser(JSON.parse(storedUser));
//             setLoading(false);
//         }
//         catch (error) {
//             console.error("Error parsing user data from localStorage:", error);
//             logout();
//         }
//     } else {
//         logout();
//     }
// }, []);

// return (
//     <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: user !== null }}>
//         {children}
//     </AuthContext.Provider>
// );
// export default AuthContextProvider;