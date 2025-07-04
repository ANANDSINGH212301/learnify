import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnBoardingapi } from "../lib/api.js";
import toast from "react-hot-toast";
import {
  CameraIcon,
  Loader2Icon,
  MapPinIcon,
  ShipWheel,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants/index.js";

const OnboardPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativelanguage: authUser?.nativelanguage || "",
    learninglanguage: authUser?.learninglanguage || "",
    location: authUser?.location || "",
    profilepic: authUser?.profilepic || "",
  });
  console.log(formState);
  const { mutate: onboardingMutation, isPending,} = useMutation({
    mutationFn: completeOnBoardingapi,
    onSuccess: () => {
      toast.success("Profile Updated Sucessfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
    console.log(formState.profilepic);
  };
  const handleRandomAvatar = () => {
    const index = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${index}.png`;
    setFormState({ ...formState, profilepic: avatar });
    toast.success("Random profilepic generated!");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
        <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
          <div className="card_body p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
              Complete Your Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col items-center justify-center space-y-4 ">
                {formState.profilepic ? (
                  <div className="flex items-center justify-center size-[14vh] bg-gray-400 rounded-full">
                    <img
                      src={formState.profilepic}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center size-[14vh] bg-gray-400 rounded-full p-3">
                    <CameraIcon className="text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="btn bg-[#5654e8d7] rounded-4xl"
                  onClick={handleRandomAvatar}
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
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
                    value={formState.fullname}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        fullname: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea
                    type="textarea"
                    placeholder="Tell others about yourself and your language learning goals"
                    className="border px-3 py-2 border-gray-600 rounded-4xl max-h-30 min-h-11 mt-1 w-full"
                    value={formState.bio}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        bio: e.target.value,
                      })
                    } 
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Native language</span>
                  </label>
                  <select
                    name="nativelanguage"
                    value={formState.nativelanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        nativelanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full border-none mt-3"
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((language) => (
                      <option
                        key={`native-${language}`}
                        value={language.toLowerCase()}
                      >
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Learning language</span>
                  </label>
                  <select
                    name="nativelanguage"
                    value={formState.learninglanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        learninglanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full border-none mt-3"
                  >
                    <option value="">Select your learning language</option>
                    {LANGUAGES.map((language) => (
                      <option
                        key={`native-${language}`}
                        value={language.toLowerCase()}
                      >
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Location </span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-6 transfrom -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                </div>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="border px-3 py-2 border-gray-600 rounded-full mt-1 w-full pl-10"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="btn btn-primary w-full rounded-4xl"
                disable={isPending}
                type="submit"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-5 mr-2" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <Loader2Icon className="size-5 mr-2 loading loading-spinner" />
                    Onboarding ......
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardPage;
