import axios from "../api";

export const getAllPatientApi = (params) => axios.get("/admin/patient", {params})
export const getOnePatientApi = (id) => axios.get("/admin/patient/" + id )
export const createOnePatientApi = (data) => axios.post("/admin/patient/add-patient" , data, {headers:{"Content-Type":"multipart/form-data"}})
export const updateOnePatientApi = (id, data) => axios.put("/admin/patient/" + id, data,{headers:{"Content-Type":"multipart/form-data"}})
export const deleteOnePatientApi = (id) => axios.delete("/admin/patient/" + id)