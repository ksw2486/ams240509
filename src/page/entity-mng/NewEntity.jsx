import React from "react";
import { Container, Row } from "react-bootstrap";
import AddBaseInfo from "./component/NewEntityForm/AddBaseInfo";

const NewEntity = () => {
  return (
    <div>
      <Container fluid>
        <h3>| Entity 등록</h3>
        <br />
        <Row>
          <AddBaseInfo/>
        </Row>
      </Container>
    </div>
  );
};

export default NewEntity;
