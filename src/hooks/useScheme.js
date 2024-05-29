import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchScheme = () =>{
    return axios.get("http://localhost:3004/scheme")
}

export const useSchemeQuery = ()=>{
    return useQuery({
        queryKey:["scheme"],
        queryFn: fetchScheme,
        select: (data) =>{
            return data.data;
        }
    })
}