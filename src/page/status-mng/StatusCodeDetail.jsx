import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import MoreModal from "./component/MoreModal";
import { useStatusCodeListQuery } from "../../hooks/useStatusCodeList";
import { useNavigate, useParams } from "react-router-dom";

import "./StatusCodeDetail.style.css";

const StatusCodeDetail = () => {
  const { data } = useStatusCodeListQuery();
  console.log("status-detail", data);

  const { id } = useParams();
  const statusDetail = data ? data[id - 1] : null;

  const [modalShow, setModalShow] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedHistory, setSelectedHistory] = useState([]);

  const navigate = useNavigate();  
  const moveStatusList = () => {
    navigate("/status");
  };
  const moveUpdate = () => {
    navigate(`/status/${id}/update`);
  };

  if (!statusDetail) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  return (
    <div>
      <br />
      <Container className="">
        <Row className="d-flex justify-content-between align-items-center">
          <Col>
            <h4>| Status Code 상세</h4>
          </Col>
          <Col className="text-end">
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={moveUpdate}>
              수정
            </Button>
            <Button variant="outline-secondary">삭제</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Table>
            <thead>
              <tr className="text-style">
                <th>
                  Status
                  <br />
                  Code
                </th>
                <th>Reason Phrase</th>
                <th>
                  HTTP
                  <br />
                  Standard
                </th>
                <th>Description</th>
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
                <td>{statusDetail.statusCode}</td>
                <td>{statusDetail.reasonPhraseKr}</td>
                <td>{statusDetail.httpStandard}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setModalShow(true);
                      setSelectedDescription(statusDetail.descriptionKr);
                      setSelectedHistory([]);
                    }}>
                    더보기
                  </Button>
                </td>
                <td>{statusDetail.state}</td>
                <td>{statusDetail.firstDate}</td>
                <td>{statusDetail.initialRegistration}</td>
                <td>{statusDetail.updateTime}</td>
                <td>{statusDetail.updateRegistration}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setModalShow(true);
                      setSelectedHistory(statusDetail.history);
                      setSelectedDescription("");
                    }}>
                    더보기
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <br />
        <Row>
          <Button variant="outline-dark" onClick={moveStatusList}>
            목록
          </Button>
        </Row>
        <MoreModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          description={selectedDescription}
          history={selectedHistory}
        />
      </Container>
    </div>
  );
};

export default StatusCodeDetail;
