import axios from "../api";

export const getAllUserApi = (params) => axios.get("/admin/users/", {params})
export const getOneUserApi = (id) => axios.get("/admin/users/" + id )
export const createOneUserApi = (data) => axios.post("/admin/users/" , data)
export const updateOneUserApi = (id, data) => axios.put("/admin/users/" + id, data)
export const deleteOneUserApi = (id) => axios.delete("/admin/users/" + id)