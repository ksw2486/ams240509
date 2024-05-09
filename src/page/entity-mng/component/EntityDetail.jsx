import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Container, Table } from "react-bootstrap";

const EntityDetail = () => {
  const fetchEntity = () => {
    return axios.get("http://localhost:3004/entity");
  };

  const { data } = useQuery({
    queryKey: ["entity"],
    queryFn: fetchEntity,
    select: (data) => {
      return data.data;
    },
  });
  console.log("detail", data);

  return (
    <div>
      <Container fluid>
        <h3>Entity</h3>
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
              <td>{data && data[0].name}</td>
              <td>{data && data[0].description}</td>
              <td>{data && data[0].pass}</td>
              <td>{data && data[0].state}</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <h4>Entity Key Information</h4>
        <Table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value Type</th>
              <th>Format</th>
              <th>Sample</th>
              <th>Description</th>
              <th>Optional</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data[0].table.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.key}</td>
                  <td>{item.valueType}</td>
                  <td>{item.format}</td>
                  <td>{item.sample}</td>
                  <td>{item.description}</td>
                  <td>{item.optional}</td>
                </tr>
              ))}
            {/* <tr>
              <td>{data[0].table[0].key}</td>
              <td>{data[0].table[0].valueType}</td>
              <td>{data[0].table[0].format}</td>
              <td>{data[0].table[0].sample}</td>
              <td>{data[0].table[0].description}</td>
              <td>{data[0].table[0].optional}</td>
            </tr> */}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default EntityDetail;
