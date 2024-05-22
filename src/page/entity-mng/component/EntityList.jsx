import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useEntityListQuery } from "../../../hooks/useEntityList";
import { Link, useNavigate } from "react-router-dom";
import "./EntityList.style.css";

const EntityList = () => {
  const { data } = useEntityListQuery();
  const navigate = useNavigate();
  console.log("dddd", data);
  const newEntity = () => {
    navigate("/entity/newEntity")
  };

  return (
    <div>
      <div className="add-form">
        <h4>Entity</h4>
        <Button onClick={newEntity}>등 록</Button>
      </div>
      <br />
      <ListGroup>
        {data?.map((item, idx) => (
          <ListGroup.Item action key={idx}>
            <Link to={`/entity/${idx}`} className="list-group">{item.name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EntityList;
