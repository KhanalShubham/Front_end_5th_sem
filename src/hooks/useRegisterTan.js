
export const UserRegisterUser=()=>{
    const [isLoading, setIsLoading]= useState(false);
    const [error, setError]= useState(null);
    const [data, setData]= useState(null);

    const register=async(FormData)=>{
        setIsLoading(true)
        setError(null);
        setData(null);
        try {
            const response = await registerUserService(FormData);
            setData(response);
            toast.success(response.message || "Registration successful");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    return { register, isLoading, error, data };

}