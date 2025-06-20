import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useRegisterPatientTan=()=>{
    return useMutation({
        mutationKey:["patient_register"],
        mutationFn:useRegisterPatientTan,
        onSuccess:(res)=>{
            toast.success(res.message || "Registration for patient successfull")
        },
         onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed for patient";
      toast.error(errorMessage);
      return errorMessage; // For Formik integration
    },
    })
}