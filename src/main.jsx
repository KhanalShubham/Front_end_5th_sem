import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Zoom } from "react-toastify";
import AppRouter from "./routers/AppRouter";
import AuthContextProvider from './auth/AuthProvider'
import "./index.css";

const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        {/* ToastContainer config */}
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          transition={Zoom}
        />
      </QueryClientProvider>
      </AuthContextProvider>
  </StrictMode>
);
