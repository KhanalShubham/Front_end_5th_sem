import { useQuery } from "@tanstack/react-query"
import { getAllUserService } from "../../services/admin/userService"
import { ListMinus } from "lucide-react"

export const useAdminUser=()=>{
    const query= useQuery(
        {
            queryKey:["admin_users"],
            queryFn:()=>{
                return getAllUserService(
                    {
                        page:1,
                        limit:5
                    }
                )
            },
            keepPreviousData:true
        }
    )
    return{
        ...query
    }
}