import axios from "./api";

// Patient: Add request (with file)
export const addOneRequestApi = (data) =>
  axios.post("/request", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Patient: Get my requests
export const getMyRequestsApi = () => axios.get("/request/my-requests");

// Patient: Delete request by ID
export const deleteRequestApi = (id) => axios.delete(`/request/${id}`);

// Admin: Get all requests (with optional query params)
export const getAllRequestsApi = (params) =>
  axios.get("/request/admin", { params });

// Admin: Update request status (approve/decline)
export const updateRequestStatusApi = (id, data) =>
  axios.patch(`/request/admin/${id}/status`, data);
