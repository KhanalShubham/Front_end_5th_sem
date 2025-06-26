import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authUserServices";
import { toast } from "react-toastify";



export const useLoginUserTan = () => {
  return useMutation({
    mutationKey: ["user_login"],
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