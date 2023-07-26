import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/refresh`, {}, {
            withCredentials: true,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.data.accessToken,
                };
                console.log("Refresh User", refreshUser)
                dispatch(stateSuccess({ infor: refreshUser }));
                config.headers["token"] = "Bearer " + data.data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};