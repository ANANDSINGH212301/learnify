import { StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("Stream Api key and secret are not set");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export default streamClient;