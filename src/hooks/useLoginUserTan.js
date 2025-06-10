import { useMutation } from "@tanstack/react-query";

export const useLoginUserTan = () => {
    return useMutation(
        {
            mutationFn: (formData) => {
                // Assuming loginUserService is a function that handles the login request
                return loginUserService(formData);
            },
            mutationKey: ['login'],
            onSuccess: (res) => {
                const { token, message, data } = res;
                // Assuming loginUserService is a function that stores the user data and token
                loginUserService(data, token);
                toast.success(message || "Login successful");
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "Login failed";
                toast.error(errorMessage);
            }
        }
    )
}