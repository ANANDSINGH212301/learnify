import { axiosInstance } from "./axios";

export const signupapi = async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
}

export const appapi = async () => {
    const res = await axiosInstance.get("/auth/me");
    console.log(res.data)
    return res.data;
}

export const completeOnBoardingapi = async (onboardData) => {
    const res = await axiosInstance.post("/auth/onboard", onboardData);
    return res.data;
}