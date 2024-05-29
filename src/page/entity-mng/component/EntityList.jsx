import React, { useEffect, useState } from "react";
import { Button, ListGroup, FloatingLabel, Form } from "react-bootstrap";
import { useEntityListQuery } from "../../../hooks/useEntityList";
import { Link, useNavigate } from "react-router-dom";
import "./EntityList.style.css";

const EntityList = () => {
  const { data = [] } = useEntityListQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  console.log("dddd", data);
  const newEntity = () => {
    navigate("/entity/newEntity");
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  return (
    <div fluid>
      <FloatingLabel
        controlId="floatingSelectGrid"
        label="배포여부"
        className="mb-2">
        <Form.Select aria-label="Floating label select example">
          <option></option>
          <option value="1">운영계 배포 대기</option>
          <option value="2">운영계 배포 완료</option>
          <option value="3">검증계 배포 대기</option>
          <option value="4">검증계 배포 완료</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingSelectGrid"
        label="사용여부"
        className="mb-2">
        <Form.Select aria-label="Floating label select example">
          <option></option>
          <option value="1">미사용</option>
          <option value="2">사용중</option>
        </Form.Select>
      </FloatingLabel>
      <Form className="d-flex mb-2">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
      <br />
      <div className="add-form">
        <h4>Entity</h4>
        <Button onClick={newEntity}>Entity 등록</Button>
      </div>
      <br />
      <ListGroup>
        {filteredData.map((item, idx) => (
          <ListGroup.Item action key={item.id}>
            <Link to={`/entity/${item.id - 1}`} className="list-group">
              {item.name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EntityList;
