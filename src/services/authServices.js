import { loginUserApi, registerUserApi } from "../api/authAPi"; 

export const registerUserApi=async(FormData)=>{
    try{
        const response=await registerUserApi(FormData);
        return response.data;
    }
    catch(error){
        console.error("Error in registerUserApi:", error);
        throw error;
    }
};
export const loginUserApi=async(FormData)=>{
    try{
        const response=await loginUserApi(FormData);
        return response.data;
    }
    catch(error){
        console.error("Error in loginUserApi:", error);
        throw error;
    }
};