import {registerPatientApi, loginPatientApi} from "../api/authPatientApi"

export const registerPatientService=async(formData)=>{
    try{
        const response=await registerPatientApi(formData);
        return response.data;
    }
    catch(err){
        throw err.response?.data||{"message":"Registration for patient failed"}
    }
}

export const loginPatientService=async(formData)=>{
    try{
        const response= await loginPatientApi(formData);
        return response.data
    }catch(err){
        throw err.response?.data||{"message":"login failed for patient"}
    }
}

