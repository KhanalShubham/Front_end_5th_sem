import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginUserService } from "../services/authServices";

export const useLoginUserTan = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUserService,
    onSuccess: (res) => {
      toast.success(res.message || "Login successful");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      return errorMessage; // For Formik integration
    },
  });
};