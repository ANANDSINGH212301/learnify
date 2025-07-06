import { useQuery } from "@tanstack/react-query";
import { getFriendsapi } from "../lib/api.js";
import { Link } from "react-router";
import { UserIcon } from "lucide-react";
import FriendCard from "./FriendCard.jsx";

const Friends = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendsapi,
  });
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {" "}
            Your Friends
          </h2>
          <Link className="btn btn-primary btn-sm" to="/notification">
            <UserIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div>
            {friends.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 bg-base-200">
                <p className="text-center">You don't have any friends yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-4 bg-base-200">
                {friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
