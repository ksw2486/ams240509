import React from "react";
import { Container, Table } from "react-bootstrap";
import { useEntityListQuery } from "../../hooks/useEntityList";
import { Outlet } from "react-bootstrap-icons";
import EntityKeyInfo from "./component/EntityKeyInfo";
import { useParams } from "react-router-dom";

const EntityDetail = () => {
  const { data, isLoading, error } = useEntityListQuery();
  const { id } = useParams();
  // const entityId = parseInt(id, 10);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // // 데이터가 로드되었고, id가 유효한 인덱스인지 확인
  // if (!data || entityId >= data.length || entityId < 0) {
  //   return <div>Invalid entity or data not found.</div>;
  // }
  // const entity = data[entityId];

  console.log("id", id);
  console.log("entity-data", data);
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
        <EntityKeyInfo />
      </Container>
      <Outlet />
    </div>
  );
};

export default EntityDetail;
