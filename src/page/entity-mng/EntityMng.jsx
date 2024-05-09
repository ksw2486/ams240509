import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchForm from "./component/SearchForm";
import EntityList from "./component/EntityList";
import EntityDetail from "./component/EntityDetail";

const EntityMng = () => {
  return (
    <Container>
      <Row>
        <Col sm="auto">
          <SearchForm />
          <br/>
          <EntityList/>
        </Col>
        <Col sm="auto">
          <EntityDetail/>
        </Col>
      </Row>
    </Container>
  );
};

export default EntityMng;
