import { data } from "autoprefixer";
import axios from "./api";

export const registerPatientApi=(data)=>axios.post("/patients/create", data)
export const loginPatientApi=(data)=>axios.post("/patients/login", data)
