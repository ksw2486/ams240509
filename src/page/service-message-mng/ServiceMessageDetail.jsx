import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { useServiceMessageListQuery } from "../../hooks/useServiceMessage";

const ServiceMessageDetail = () => {
  const { data } = useServiceMessageListQuery();
  const { id } = useParams();

  // const detailData = data ? data[id - 1] : null;
  console.log("detailData", data);
  // if (!detailData) {
  //   return <div>데이터를 불러오는 중입니다...</div>;
  // }

  return (
    <div>
      <Container fluid>
        <br />
        <Row>
          <Col>
            <h3>
              <strong>| Service Message</strong>
            </h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="outline-dark" className="me-2">
              Service Message 등록(복사)
            </Button>
            <Button variant="outline-dark" className="me-2">
              수정
            </Button>
            <Button variant="outline-dark">삭제</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Message ID</th>
                <th>Service Message 명</th>
                <th>Description</th>
                <th>배표</th>
                <th>상태</th>
                <th>등록일시</th>
                <th>등록자(사번)</th>
                <th>수정일시</th>
                <th>수정자(사번)</th>
                <th>변경이력</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data && data[id].svmId}</td>
                <td>{data && data[id].svmName}</td>
                <td>{data && data[id].descriptionKr}</td>
                <td>{data && data[id].distribution}</td>
                <td>{data && data[id].state}</td>
                <td>{data && data[id].firstDate}</td>
                <td>{data && data[id].initialRegistration}</td>
                <td>{data && data[id].updateTime}</td>
                <td>{data && data[id].updateRegistration}</td>
                <td>{data && data[id].history}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <h5>◆ Service Group</h5>
          <Table>
            <thead>
              <tr>
                <th>Group ID</th>
                <th>Service Group 명</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data && data[id].serviceGroup.groupId}</td>
                <td>{data && data[id].serviceGroup.groupName}</td>
                <td>{data && data[id].serviceGroup.description}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <h5>◆ Basic Information</h5>
          <Table>
            <thead>
              <tr>
                <th>Host</th>
                <th>Service Hub</th>
                <th>Scheme</th>
                <th>Method</th>
                <th>URI/Topic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data && data[id].host}</td>
                <td>{data && data[id].seviceHub}</td>
                <td>{data && data[id].scheme}</td>
                <td>{data && data[id].method}</td>
                <td>{data && data[id].uriTopic}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <h5>◆ Request Contents Information</h5>
          <Table>
            <thead>
              <tr>
                <th>Request Content Type</th>
                <th>Entity Type</th>
                <th>Entity Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data && data[id].reqContentInfo.reqContType}</td>
                <td>{data && data[id].reqContentInfo.entityType}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <h5>◆ Request Body</h5>
          <Table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <h5>◆ Response Contents Information</h5>
          <Table>
            <thead>
              <tr>
                <th>Respose Content Type</th>
                <th>Entity Type</th>
                <th>Entity Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data && data[id].respContentInfo.respContType}</td>
                <td>{data && data[id].respContentInfo.entityType}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <h5>◆ Response Body</h5>
          <Table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceMessageDetail;
