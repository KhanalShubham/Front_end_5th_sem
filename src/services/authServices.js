import { loginUserApi, registerUserApi } from "../api/authAPi"; 

export const registerUserService=async(FormData)=>{
    try{
        const response=await registerUserApi(FormData);
        return response.data;
    }
    catch(error){
        console.error("Error in registerUserService:", error);
        throw error;
    }
};
export const loginUserService=async(FormData)=>{
    try{
        const response=await loginUserApi(FormData);
        return response.data;
    }
    catch(error){
        console.error("Error in loginUserService:", error);
        throw error;
    }
};