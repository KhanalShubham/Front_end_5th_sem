import {useMutation} from '@tanstack/react-query';

import { registerUserService } from '../services/authServices';
import { toast } from 'react-toastify';

export const UserRegisterUserTan=()=>{
    return useMutation(
        {
            mutationFn: registerUserService,
            mutationKey: ['register'],
            onSuccess:(data)=>{
                toast.success(data.message || "Registration successful");
            },
            onError:(error)=>{
                const errorMessage = error.response?.data?.message || "Registration failed";
                toast.error(errorMessage);
            }
        }
    )
}