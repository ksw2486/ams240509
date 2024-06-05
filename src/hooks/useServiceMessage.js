import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchServiceMessage = async () => {
  return await axios.get("http://localhost:3004/service-message");
};

const updataSVM =async (newSVM) => {
  try {
    const response = await axios.post(
      "http://localhost:3004/service-message",
      newSVM
    );
    console.log("Server response:", response.data);
    return response.data; // 서버에서 업데이트된 결과를 반환
  } catch (error) {
    console.error("Error updating :", error);
    throw new Error("Error updating :", error);
  }
};

export const useServiceMessageListQuery = () => {
  return useQuery({
    queryKey: ["service-message-list"],
    queryFn: fetchServiceMessage,
    select: (data) => {
      return data.data;
    },
  });
};

export const useServicMessageUpdataQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updataSVM,
    onSuccess: (data) => {
      console.log("SVM updated successfully:", data);
      queryClient.invalidateQueries("service-message-list");
    },
    onError: (error) => {
      console.error("Error updating SVM:", error);
    },
  });
};
