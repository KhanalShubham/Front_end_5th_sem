import axios from "../api";

export const getAllPatientApi = (params) => axios.get("/admin/patient", {params})
export const getOnePatientApi = (id) => axios.get("/admin/patient/" + id )
export const createOnePatientApi = (data) => axios.post("/admin/patient/add-patient" , data)
export const updateOnePatientApi = (id, data) => axios.put("/admin/patient/" + id, data)
export const deleteOnePatientApi = (id) => axios.delete("/admin/patient/" + id)