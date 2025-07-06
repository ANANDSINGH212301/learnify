import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MapPinIcon, UserIcon, UserPlusIcon, CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import FriendCard from "../component/FriendCard.jsx";
import { getLanguageFlag } from "../component/FriendCard.jsx";
import { Capitialize } from "../lib/utils.js";
import {
  getOutGoingFriendRequestapi,
  getrecommendedUsersapi,
  sendFriendRequestapi,
} from "../lib/api.js";

const HomePage = () => {
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());
  const queryClient = useQueryClient();

  const { data: recommendUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getrecommendedUsersapi,
  });
  const { data: outgoingFriendreqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutGoingFriendRequestapi,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequestapi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendreqs && outgoingFriendreqs.length > 0) {
      outgoingFriendreqs.forEach((request) => {
        outgoingIds.add(request.recipient._id);
      });
      setOutgoingRequestIds(outgoingIds);
    }
  }, [outgoingFriendreqs]);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-base-100">
        <div className="container mx-auto space-y-5">
          <div className="mb-10">
            <p className="font-semibold text-2xl">Hello, Welcome to Learnify !!</p>
          </div>
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partner base on your
                  profile
                </p>
              </div>
            </div>
            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : recommendUsers.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 bg-base-200">
                <p className="text-center">No Recommended User Found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-100 gap-6">
                {recommendUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestIds.has(user._id);
                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-lg tansition-all duration-300"
                    >
                      <div className="card-body p-5 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar size-16 rounded-full">
                            <img src={user.profilepic} alt={user.fullname} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {user.fullname}
                            </h3>
                            {user.location && (
                              <div className=" flex flex-center justify-center text-xs opacity-70 mt-1.5">
                                <MapPinIcon />
                                <span className="mt-0.5">
                                {user.location}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 ">
                          <span className="badge badge-secondary">
                            {getLanguageFlag(user.nativelanguage)}
                            Native: {Capitialize(user.nativelanguage)}
                          </span>
                          <span className="badge badge-outline">
                            {getLanguageFlag(user.learninglanguage)}
                            Learning: {Capitialize(user.learninglanguage)}
                          </span>
                        </div>
                        {user.bio && (
                          <p className="text-sm opacity-70">{user.bio}</p>
                        )}
                        <button
                          className={`btn w-full mt-2 ${
                            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          } `}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}{" "}
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;


