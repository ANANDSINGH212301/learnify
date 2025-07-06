import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors";
import { connectDB } from "./lib/db.js";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT;

const _dirname = path.resolve();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT || 5000, () => {
    connectDB();
    console.log(`server is runnung on port : ${PORT}`);
});