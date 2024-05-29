import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProvisioning =()=>{
    return axios.get("http://localhost:3004/provisioning-table")
}

export const useProvisioningListQuery = ()=>{
    return useQuery({
        queryKey : ["provisioning-tablel"],
        queryFn : fetchProvisioning,
        select: (data) => {
            return data.data;
          },
    })
}