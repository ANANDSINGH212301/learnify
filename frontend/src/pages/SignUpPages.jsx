import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate } from "react-router";
import "daisyui";
import { ShipWheelIcon } from "lucide-react";
import video from "./Video call-bro.svg";
import { signupapi } from "../lib/api.js";
import toast from "react-hot-toast";

const SignUpPages = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signupMutation,
    isPending,
  } = useMutation({
    mutationFn: signupapi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  return (
    <>
      <div
        className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        data-theme="forest"
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/* left side */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
            <div className="mb-4 flex items-center justify-start gap-2 ">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-white tracking-wider">
                {" "}
                Learnify{" "}
              </span>
            </div>
            <div className="w-full">
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Create an Account</h2>
                    <p className="text-sm text-gray-400">
                      Join Learnify and start your language learning adventure!
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="border px-3 py-2 border-gray-600 rounded-full mt-1 w-full"
                        value={signupData.fullname}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            fullname: e.target.value,
                          })
                        }
                      />
                    </div>
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
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
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
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-control mt-5">
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm "
                          required
                        />
                        <span>
                          I agree to the {""}
                          <span className="text-primary hover:underline">
                            terms of services
                          </span>{" "}
                          and{" "}
                          <span className="text-primary hover:underline">
                            privacy policy
                          </span>
                        </span>
                      </label>
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
                      "Create Account"
                    )}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an Account ?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden lg:flex w-full lg:w-1/2 bg-primary-10 items-center justify-center bg-[#5654e88e]">
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

export default SignUpPages;
