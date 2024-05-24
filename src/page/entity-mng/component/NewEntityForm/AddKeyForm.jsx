import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddKeyForm = () => {
  return (
    <Container>
      <Row>
        <Form className="input">
          <Form.Group as={Row} className="mb-2" controlId="valueType">
            <Col sm="5">
              <Form.Select>
                <option>Value Type*</option>
                <option value="1">String</option>
                <option value="2">Intger</option>
                <option value="3">Double</option>
                <option value="4">Pattern</option>
                <option value="5">Object</option>
              </Form.Select>
            </Col>
            <Col sm="2">
              <Button variant="outline-dark" onClick={selectEntity}>
                Entity선택
              </Button>
            </Col>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder="Entity Name"
                disabled
                value={selectedEntity}
              />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className="input">
          <Form.Group as={Row} className="mb-2" controlId="format">
            <Col sm="12">
              <Form.Control
                as="textarea"
                placeholder="Format"
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="sample">
            <Col sm="12">
              <Form.Control
                type="text"
                placeholder="Sample*"
                value={sample}
                onChange={(e) => {
                  setSample(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="descriptionKor">
            <Col sm="12">
              <Form.Control
                as="textarea"
                placeholder="Discription(KOR)*"
                value={keyDiscriptKor}
                onChange={(e) => {
                  setKeyDiscriptKor(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="descriptionEng">
            <Col sm="12">
              <Form.Control
                as="textarea"
                placeholder="Discription(ENG)*"
                value={keyDiscriptEng}
                onChange={(e) => {
                  setKeyDiscriptEng(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default AddKeyForm;
