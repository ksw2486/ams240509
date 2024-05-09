import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ListGroup } from "react-bootstrap";

const EntityList = () => {
  const fetchEntity = () => {
    return axios.get("http://localhost:3004/entity");
  };

  const { data } = useQuery({
    queryKey: ["entity"],
    queryFn: fetchEntity,
    select: (data) => {
      return data.data;
    },
  });
  console.log("dddd", data);
  return (
    <div>
      <h4>Entity</h4>
      <ListGroup>
        {data?.map((item, idx) => (
          <ListGroup.Item action key={idx}>
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EntityList;
