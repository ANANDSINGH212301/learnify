import { useQuery } from "@tanstack/react-query";
import { appapi } from "../lib/api.js";

const useAuthUser = () => {
    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: appapi,
        retry: false,
    });

    return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
}

export default useAuthUser