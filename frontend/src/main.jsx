import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "stream-chat-react/dist/css/v2/index.css";
import App from "./App.jsx";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
