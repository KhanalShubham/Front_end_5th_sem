import { useContext } from "react"
import { loginUserService } from "../services/authServices"



export const useLoginUser=()=>{
    return useMutation({
        mutationFn: loginUserService,
        onSuccess:(res)=>{
            const{token, message, data}=res;
            loginUserService(data, token);
            toast.success(message || "Login successful",);

        },
        onError:(error)=>{
            const errorMessage = error.response?.data?.message || "Login failed";
            toast.error(errorMessage);
        }
    })
}