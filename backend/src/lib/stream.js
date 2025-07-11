import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.log("Stream Api key and secret are not set");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Stream service have a problem :", error);
    }
}

export const generateStreamToken = (userId) => {
   try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
   } catch (error) {
    console.error("Error generatingStreamToken:", error);
   }
}