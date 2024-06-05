import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchStatusCode = async () => {
  return await axios.get("http://localhost:3004/status-Code");
};

const updataStatuscode = async (newStatusCode) => {
  try {
    const response = await axios.post(
      "http://localhost:3004/status-Code",
      newStatusCode
    );
    console.log("Server response:", response.data);
    return response.data; // 서버에서 업데이트된 결과를 반환
  } catch (error) {
    console.error("Error updating entity:", error);
    throw new Error("Error updating entity:", error);
  }
};

export const useStatusCodeListQuery = () => {
  return useQuery({
    queryKey: ["status-code-list"],
    queryFn: fetchStatusCode,
    select: (data) => {
      return data.data;
    },
  });
};

export const useStatusCodeUpdataQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updataStatuscode,
    onSuccess: (data) => {
      console.log("Status Code updated successfully:", data);
      queryClient.invalidateQueries("status-code-list");
    },
    onError: (error) => {
      console.error("Error updating Status Code:", error);
    },
  });
};
