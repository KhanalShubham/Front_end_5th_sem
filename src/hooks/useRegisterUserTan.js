import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { registerUserService } from "../services/authUserServices";

export const useRegisterUserTan = () => {
  return useMutation({
    mutationKey: ["user_register"],
    mutationFn: registerUserService,
    onSuccess: (res) => {
      toast.success(res.message || "Registration successful");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
      return errorMessage; // For Formik integration
    },
  });
};