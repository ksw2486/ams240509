import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStatusCode = async () => {
  return await axios.get("http://localhost:3004/status-Code");
};

export const useStatusCodeListQuery = () => {
  return useQuery({
    queryKey: ["status-code-list"],
    queryFn: fetchStatusCode,
    select: (data) => {
      return data.data[0];
    },
  });
};
