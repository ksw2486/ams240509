import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchForm from "./component/SearchForm";
import EntityList from "./component/EntityList";
import AgGrid from "./component/AgGrid";
import EntityKeyInfo from "./component/EntityKeyInfo";
import TreeAgGrid from "../../study/TreeAgGrid";
import { Outlet } from "react-router-dom";


const EntityMng = () => {
  return (
    <Container fluid='ture'>
      <br/>
      <Row>
        <Col sm="auto">         
          <EntityList/>
        </Col>
        <Col sm="auto">       
          {/* <AgGrid/> */}
          {/* <EntityKeyInfo/>
          <TreeAgGrid/> */}
          <Outlet/>
        </Col>
      </Row>
      
    </Container>
  );
};

export default EntityMng;
