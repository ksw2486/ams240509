import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ServiceMessageList from "./component/ServiceMessageList";

const ServiceMessageMng = () => {
  return (
    <div>
      <Container fluid="ture">
        <br/>
        <Row>
          <Col sm="auto">
            <ServiceMessageList />
          </Col>
          <Col sm="auto">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceMessageMng;
