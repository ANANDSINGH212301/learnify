import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutapi } from "../lib/api.js";
import useAuthUser from "../hooks/useAuthUser.js";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import { ShipWheelIcon, BellIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector.jsx";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatpage = location.pathname?.startsWith("/chat");

  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logoutapi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.message);
    },
  });
  const handleLogout = () => {
    logoutMutation();
  };
  return (
    <>
      <nav className="bg-base-300 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm-px-6 lg-px-8">
          <div className="flex items-center justify-between w-full">
            {isChatpage && (
              <div className="pl-5">
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2.5"
                >
                  <ShipWheelIcon className="size-9 text-primary" />
                  <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                    Learnify
                  </span>
                </Link>
              </div>
            )}
            <div className="flex items-center justify-end w-full">
              <div className="flex items-center gap-3 sm-gap-4">
                <Link
                  to={"/notification"}
                  className={`btn btn-ghost btn-circle`}
                >
                  <BellIcon className="size-5 text-base-content opacity-70" />
                </Link>
              </div>
              <ThemeSelector />
              <div className="w-9 rounded-full">
                <img
                  src={authUser?.profilepic}
                  alt="user Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <button
                className="btn btn-ghost btn-circle opacity-70"
                onClick={handleLogout}
              >
                <LogOutIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
