import { useMutation } from "@tanstack/react-query";
import { loginPatientApi } from "../api/authPatientApi";

export const useLoginPatientTan = () => {
  return useMutation({
    mutationKey: ["patient_login"],
    mutationFn: loginPatientApi,
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