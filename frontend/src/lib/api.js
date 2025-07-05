import { axiosInstance } from "./axios";

export const signupapi = async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
};

export const loginapi = async (loginData) => {
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
};
export const logoutapi = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};

export const appapi = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.log("Error in authUser :", error)
        return null;
    }
};

export const completeOnBoardingapi = async (onboardData) => {
    const res = await axiosInstance.post("/auth/onboard", onboardData);
    return res.data;
};