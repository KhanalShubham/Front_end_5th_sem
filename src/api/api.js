import axios from 'axios';

const API_URL=import.meta.env.VITE_API_BASE_URL || 
'localhost:5050/api' //fallback

const instance=axios.create(
    {
        baseURL:API_URL,
        headers:{
            "Content-Type": "application/json",
        }
    }
)
instance.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization="Bearer "+token
    }
    return config
})
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       window.location.href = "/admin/login"
//     }
//     return Promise.reject(error)
//   },
// )


export default instance;