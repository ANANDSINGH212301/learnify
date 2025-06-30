import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import {getRecommendedUsers , getMyFriends} from "../controller/user.controller.js";

const routes = express.Router();

routes.use(protectRoute);

routes("/", getRecommendedUsers);
routes("/friends", getMyFriends);

export default routes;