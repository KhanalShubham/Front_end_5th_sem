import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOnePatientService, deletePatientService, getAllPatientService, getPatientByIdService, updateOnePatientService } from "../../services/admin/patientService"
import { useState } from "react"
import toast from "react-hot-toast"

export const useAdminPatient=()=>{
  const [pageNumber, setPageNumber] = useState(1) // 
    const [pageSize, setPageSize] = useState(10) // 
    const [search, setSearch ] = useState("") //
    const query= useQuery(
        {
            queryKey:["admin_patient",, pageNumber, pageSize, search],
            queryFn:()=>{
                return getAllPatientService(
                    {
                        page: pageNumber,
                        limit: pageSize,
                        search: search
                    }
                )
            },
            keepPreviousData:true
        }
        
    )
    const patients = query.data?.data || []
    const pagination = query.data?.pagination || {
        page:1, totalPages:1, limit: 10
    }
    const canPreviousPage = pagination.page > 1
    const canNextPage = pagination.page < pagination.totalPages
    return{
      ...query,
        patients,
        pagination,
        canPreviousPage,
        canNextPage,
        setPageNumber,
        setPageSize,
        setSearch
        

    }
}

export const useCreatePatient = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationKey:
                ["admin_create_patient"],
            mutationFn:
                createOnePatientService,
            onSuccess: () => {
                queryClient
                    .invalidateQueries(
                        "admin_patient"
                    )
            }
        }
    )
}
export const useGetOnePatient = (id) => {
    const query = useQuery(
        {
            queryKey: ["admin_patient_detail", id],
            queryFn: () => getPatientByIdService(id),
            enabled: !!id, // id is not null or undefined
            retry: false // tries 3 times default
        }
    )
    const patient = query.data?.data || {}
    return {
        ...query, patient
    }
}

export const useUpdatePatient = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: ({id, data}) => updateOnePatientService(id, data),
            mutationKey: ["admin_patient_update"],
            onSuccess: () => {
                toast.success("Updated")
                queryClient.invalidateQueries(
                    ["admin_patient", "admin_patient_detail"]
                )
            },
            onError: (err)=> {
                toast.error(err.message || "Update failed")
            }
        }
    )
}



export const useDeleteOnePatient = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: deletePatientService,
            mutationKey: ["admin_patient_delete"],
            onSuccess: () => {
                toast.success("Deleted")
                queryClient.invalidateQueries(["admin_patient"])
            },
            onError: (err)=> {
                console.log(err)
                toast.error(err.message || "Delete Failed")
            }
        }
    )
}