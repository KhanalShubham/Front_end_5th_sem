import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authServices";

export const useLoginUserTan = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUserService, // Expects formData { email, password, rememberMe }
    onSuccess: (res) => {
      const { token, message, data } = res;
      // login function from AuthContext is called in the component
      toast.success(message || "Login successful");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    },
  });
};