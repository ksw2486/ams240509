import React from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";

const SearchForm = () => {
  return (
    <Container>
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
        />
        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
    </Container>
  );
};

export default SearchForm;
