import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserIcon} from "lucide-react"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getOutGoingFriendRequestapi,
  getFriendsapi,
  getrecommendedUsersapi,
  sendFriendRequestapi,
} from "../lib/api.js";

const HomePage = () => {
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendsapi,
  });
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
        outgoingIds.add(request.id);
      });
      setOutgoingRequestIds(outgoingIds);
    }
  }, [outgoingFriendreqs]);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight"> Your Friends</h2>
            <Link className="btn btn-primary btn-sm" to="/notifications">
            <UserIcon className="mr-2 size-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
