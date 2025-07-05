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
import useAuthUser from "./hooks/useAuthUser.js";
import PageLoader from "./component/PageLoader.jsx";
import Layout from "./component/Layout.jsx";
import { useThemestore } from "./store/useThemeStore.js";

function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const { theme } = useThemestore();
  if (isLoading) return <PageLoader />;

  return (
    <>
      <div className=" h-screen" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSlidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
              )
            }
          ></Route>
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPages />
              ) : isOnboarded ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/onboard" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : isOnboarded ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/onboard" />
              )
            }
          ></Route>
          <Route
            path="/notification"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSlidebar={true}>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
              )
            }
          ></Route>
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSlidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
              )
            }
          ></Route>
          <Route
            path="/call"
            element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/onboard"
            element={
              isAuthenticated ? (
                isOnboarded ? (
                  <Navigate to={"/"} />
                ) : (
                  <OnboardPage />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
        </Routes>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
