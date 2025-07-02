import "./app.css";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage";
import SignUpPages from "./pages/SignUpPages";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import OnboardPage from "./pages/OnboardPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../backend/src/lib/axios.js";

function App() {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/auth/me");
      return res.data;
    },
    retry: false,
  });
  const authUser = authData?.user;

  return (
    <>
      <div className=" h-screen" data-theme="night">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/signup"
            element={!authUser ? <SignUpPages /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/notification"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/call"
            element={authUser ? <CallPage /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/onboard" element={authUser ? <OnboardPage /> : <Navigate to="/login" />}></Route>
        </Routes>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
