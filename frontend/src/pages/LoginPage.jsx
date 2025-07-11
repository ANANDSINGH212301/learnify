import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { loginapi } from "../lib/api.js";
import video from "./Video call-bro.svg";
import { Link } from "react-router";
import toast from "react-hot-toast";
import themes from "daisyui/theme/object.js";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: loginapi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };
  return (
    <>
      <div
        className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        data-theme={themes}
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/* left side */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
            <div className="mb-4 flex items-center justify-start gap-2 ">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                {" "}
                Learnify{" "}
              </span>
            </div>
            <div className="w-full">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Welcome Back</h2>
                    <p className="text-sm text-gray-400">
                      Signin to your account to continue your language journey
                    </p>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Email@gmail.com"
                          className="border px-3 py-2 border-gray-600 rounded-full mt-1 w-full"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="***********"
                          className="border py-2 px-3 border-gray-600 rounded-full mt-1 w-full"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary rounded-full w-full "
                    type="submit"
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs">
                          Loading....
                        </span>
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Dont't have an Account ?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create One
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden lg:flex w-full lg:w-1/2 bg-primary-10 items-center justify-center">
            <div className="max-w-md p-8">
              <div className="relative aspect-square max-w-sm mx-auto">
                <img src={video} alt="" className="w-full h-full" />
              </div>
              <div className="text-center space-y-3 mt-3">
                <h2 className="text-xl font-semibold">
                  Connect with Language partner Worldwide
                </h2>
                <p className="opacity-70">
                  {" "}
                  Practice conversations, making friends, and improve your
                  language skill together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
