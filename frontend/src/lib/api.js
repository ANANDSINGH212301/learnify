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

export const getrecommendedUsersapi = async () => {
    const res = await axiosInstance.get("/user");
    return res.data;
};

export const getFriendsapi = async () => {
    const res = await axiosInstance.get("/user/friends");
    return res.data;
};

export const getOutGoingFriendRequestapi = async () => {
    const res = await axiosInstance.get("/user/outgoing-friend-request");
    return res.data;
};

export const getFriendRequestapi = async () => {
    const res = await axiosInstance.get("/user/friend-requests");
    return res.data;
};

export const sendFriendRequestapi = async (userId)=> {
    const res = await axiosInstance.post(`/user/friend-request/${userId}`)
    return res.data;
};

export const acceptFriendRequestapi = async (userId)=> {
    const res = await axiosInstance.put(`/user/friend-request/${userId}/accept`)
    return res.data;
};

export const getStreamTokenapi = async () => {
    const res = await axiosInstance.get("/chat/token");
    return res.data;
}