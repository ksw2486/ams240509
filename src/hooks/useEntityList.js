import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchEntity = () => {
  return axios.get("http://localhost:3004/entity");
};

// const updataEntity = (newEntityData) => {
//   // const itemsToUpdate=[{name, description, pass, state, table}]
//   return axios.post("http://localhost:3004/entity", newEntityData);
// };

const updataEntity = async (newEntityData) => {
  try {
    const response = await axios.post(
      "http://localhost:3004/entity",
      newEntityData
    );
    console.log("Server response:", response.data);
    return response.data; // 서버에서 업데이트된 결과를 반환
  } catch (error) {
    console.error("Error updating entity:", error);
    throw new Error("Error updating entity:", error);
  }
};

export const useEntityListQuery = () => {
  return useQuery({
    queryKey: ["entity"],
    queryFn: fetchEntity,
    select: (data) => {
      return data.data;
    },
  });
};
export const useEntityKeyInfoQuery = () => {
  return useQuery({
    queryKey: ["entity-key-info"],
    queryFn: fetchEntity,
    select: (data) => {
      return data.data;
    },
  });
};
export const useEntityUpdataQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updataEntity,
    onSuccess: (data) => {
      console.log("Entity updated successfully:", data);
      queryClient.invalidateQueries("entity");
    },
    onError: (error) => {
      console.error("Error updating entity:", error);
    },
  });
};
