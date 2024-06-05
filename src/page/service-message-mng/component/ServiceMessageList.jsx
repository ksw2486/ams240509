import React, { useEffect, useState } from "react";
import { Button, ListGroup, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useServiceMessageListQuery } from "../../../hooks/useServiceMessage";

const ServiceMessageList = () => {
  const { data = [] } = useServiceMessageListQuery();
  // console.log("SVM-list", data && data[0].svmName);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const addSVM = () => {
    navigate("/service-message/addServiceMessageForm");
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data?.filter((item) =>
          item.svmName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  return (
    <div>
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
        <Button variant="outline-success">Search</Button>
      </Form>
      <br />
      <div className="add-form">
        <h4>Service Message</h4>
        <Button variant="outline-success" onClick={addSVM}>
          SVM 등록
        </Button>
      </div>
      <br />
      <ListGroup>
        {filteredData.map((item, idx) => (
          <ListGroup.Item action key={item.id}>
            <Link to={`/service-message/${item.id - 1}`} className="list-group">
              {/* [{item.svmId}] {item.svmName} */}
              {item.svmName}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ServiceMessageList;
