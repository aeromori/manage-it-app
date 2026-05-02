// import React, {
//     createContext,
//     useContext,
//     useEffect,
//     useLayoutEffect,
//     useState,
// } from "react";

// import api from "../api/api";

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//     const authContext = useContext(AuthContext);

//     if (!authContext) {
//         throw new Error("useAuth must be used within a AuthProvider");
//     }

//     return authContext;
// };

// const AuthProvider = () => {
//     const [token, setToken] = useState<undefined | null | string>();

//     useEffect(() => {
//         const fetchMe = async () => {
//             try {
//                 const response = await api.get("/api/me");
//             } catch {
//                 setToken(null);
//             }
//         };

//         fetchMe();
//     }, []);

//     useLayoutEffect(() => {
//         const authInterceptor = api.interceptors.request.use((config: any) => {
//             config.headers.authorization =
//                 !config._retry && token
//                     ? `Bearer ${token}`
//                     : config.headers.authorization;

//             return config;
//         });

//         return () => {
//             api.interceptors.request.eject(authInterceptor);
//         };
//     }, [token]);

//     useLayoutEffect(() => {
//         const refreshInterceptor = api.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 const originalRequest = error.config;

//                 if (
//                     error.response.status === 403 &&
//                     error.response.data.message === "Unauthorized"
//                 ) {
//                     try {
//                         const response = await api.get("/api/refreshToken");

//                         setToken(response.data.accessToken);

//                         originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`;
//                         originalRequest._retry = true;

//                         return api(originalRequest);
//                     } catch {
//                         setToken(null);
//                     }
//                 }
//                 return Promise.reject(error);
//             }
//         );
//     });
// };

// export default AuthProvider;
