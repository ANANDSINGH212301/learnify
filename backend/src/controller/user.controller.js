import User from "../models/user.model"

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id
        const currentUser = req.user

        const recommendedUser = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { $id: { $nin: currentUser.friends } },
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommendedUser);
    } catch (error) {
        console.log("Error occur while fetching recommended users", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends","fullname profilepic nativelanguage learninglanguage")

        res.status(200).json(user.friends)
    } catch (error) {
        
    }
}