import React from "react";
import { Container, Table } from "react-bootstrap";
import { useEntityListQuery } from "../../hooks/useEntityList";
import { Outlet } from "react-bootstrap-icons";
import EntityKeyInfo from "./component/EntityKeyInfo";
import { useParams } from "react-router-dom";

const EntityDetail = () => {
  const { data } = useEntityListQuery();
  const { id } = useParams();

  console.log("id", id);
  return (
    <div>
      <Container fluid>
        <h3>| Entity</h3>
        <Table>
          <thead>
            <tr>
              <th>Entity</th>
              <th>Description</th>
              <th>배포</th>
              <th>상태</th>
              {/* <th>등록일시</th>
              <th>등록자</th>
              <th>수정일시</th>
              <th>수정자</th>
              <th>변경이력</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data && data[id].name}</td>
              <td>{data && data[id].description}</td>
              <td>{data && data[id].pass}</td>
              <td>{data && data[id].state}</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <EntityKeyInfo props={id} />
      </Container>
      <Outlet />
    </div>
  );
};

export default EntityDetail;
