import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchHeader = async ()=>{
    return await axios.get(`http://localhost:3004/header`)
}

export const useHeaderListQuery =()=>{
    return useQuery({
        queryKey : ["header-list"],
        queryFn : fetchHeader,
        select : (data)=>{return data.data}
    })
}