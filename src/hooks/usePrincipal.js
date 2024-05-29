import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchPrincipal = () => {
  return axios.get("http://localhost:3004/principal");
};

const updataPrincipal = async (newData) => {
  try {
    const response = await axios.post(
      "http://localhost:3004/principal",
      newData
    );
    console.log("Server response:", response.data);
    return response.data; // 서버에서 업데이트된 결과를 반환
  } catch (error) {
    console.error("Error updating principal:", error);
    throw new Error("Error updating principal:", error);
  }
};

export const usePrincipalQuery = () => {
  return useQuery({
    queryKey: ["principal"],
    queryFn: fetchPrincipal,
    select: (data) => {
      return data.data;
    },
  });
};

export const usePrincipalUpdataQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updataPrincipal,
    onSuccess: (data) => {
      console.log("principal updated successfully:", data);
      queryClient.invalidateQueries("entity");
    },
    onError: (error) => {
      console.error("Error updating principal:", error);
    },
  });
};
