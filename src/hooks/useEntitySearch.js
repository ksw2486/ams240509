import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEntitySearch = ({ keyword }) => {
  return keyword
    ? axios.get(`http://localhost:3004/entity?q=${keyword}`)
    : axios.get(`http://localhost:3004/entity`);
};

export const useEntitySearchQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["entity-search", keyword],
    queryFn: () => fetchEntitySearch({ keyword }),
    select: (result) => {
      return result.data;
    },
  });
};
