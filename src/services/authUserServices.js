import { loginUserApi, registerUserApi } from "../api/authUserAPi";

export const registerUserService = async (formData) => {
  try {
    const response = await registerUserApi(formData);
    return response.data; 
  } catch (err) {
    throw err.response?.data || { message: "Registration for donor failed" };
  }
};

export const loginUserService = async (formData) => {
  try {
    const response = await loginUserApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
