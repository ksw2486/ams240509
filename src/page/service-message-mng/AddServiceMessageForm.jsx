import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AddServicemessageForm.style.css";
import {
  useServicMessageUpdataQuery,
  useServiceMessageListQuery,
} from "../../hooks/useServiceMessage";

const AddServiceMessageForm = () => {
  const [svmName, setSvmName] = useState("");
  const [descriptionKr, setDescriptionKr] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [seviceHub, setServiceHub] = useState("");
  const [scheme, setScheme] = useState("");
  const [method, setMethod] = useState("");
  const [uriTopic, setUriTopic] = useState("");
  const [reqContType, setReqContType] = useState("");
  const [entityType1, setEntityType1] = useState("");
  const [respContType, setRespContType] = useState("");
  const [entityType2, setEntityType2] = useState("");
  const [svmData, setSvmData] = useState([
    {
      svmId: "",
      svmName: "",
      descriptionKr: "",
      descriptionEng: "",
      distribution: "",
      state: "",
      firstDate: "",
      initialRegistration: "",
      updateTime: "",
      updateRegistration: "",
      history: "",
      serviceGroup: {
        groupId: "",
        groupName: "",
        description: "",
      },
      host: "",
      seviceHub: "",
      scheme: "",
      method: "",
      uriTopic: "",
      reqContentInfo: {
        reqContType: "",
        entityType: "",
      },
      respContentInfo: {
        respContType: "",
        entityType: "",
      },
    },
  ]);

  const resetForm = () => {
    setSvmName("");
    setDescriptionKr("");
    setDescriptionEng("");
    setServiceHub("");
    setScheme("");
    setMethod("");
    setReqContType("");
    setUriTopic("");
    setRespContType("");
    setEntityType1("");
    setEntityType2("");
  };

  const navigate = useNavigate();
  const { data } = useServiceMessageListQuery();
  const { mutate: addSVM } = useServicMessageUpdataQuery();

  const confirmSave = () => {
    const newSVM = {
      id: data?.length
        ? String(Math.max(...data.map((row) => row.id)) + 1)
        : "1",
      svmName,
      descriptionKr,
      descriptionEng,
      firstDate: formattedDateTime,
      seviceHub,
      scheme,
      method,
      uriTopic,
      serviceGroup: {
        groupId: "",
        groupName: "",
        description: ""
      },
      reqContentInfo: {
        reqContType,
        entityType: entityType1,
      },
      respContentInfo: {
        respContType,
        entityType: entityType2,
      },
    };
    addSVM(newSVM);
    resetForm();
  };
  const now = new Date();
  const formattedDateTime = now
    .toLocaleString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\./g, "")
    .replace(/ /g, ".");
  console.log("current-date", formattedDateTime);

  return (
    <Container className="addSVM">
      <br />
      <h3>
        <strong>| Service Message 등록</strong>
      </h3>
      <br />
      <Row>
        <h5>◆ 기본정보</h5>
      </Row>
      <br />
      <Row>
        <Form className="input">
          <Form.Group as={Row} className="mb-2" controlId="statusCode">
            <Row className="mb-2">
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Service Message Name*"
                  value={svmName}
                  onChange={(e) => setSvmName(e.target.value)}
                />
              </Col>
              <Col sm="2" className="d-flex justify-content-end">
                <Button variant="outline-dark">중복확인</Button>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Description(KOR)*"
                  value={descriptionKr}
                  onChange={(e) => setDescriptionKr(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Description(ENG)*"
                  value={descriptionEng}
                  onChange={(e) => setDescriptionEng(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
      <br />
      <Row>
        <Col>
          <h5>◆ Service Group</h5>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-dark">Service Group 선택</Button>
        </Col>
      </Row>
      <br />
      <Row>
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
              <td>{""}</td>
              <td>{""}</td>
              <td>{""}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <br />
      <Row>
        <h5>◆ Basic Information</h5>
      </Row>
      <br />
      <Form>
        <Row className="align-items-center mb-2">
          <Col sm="2" className="d-flex align-items-center">
            <Form.Label className="mb-0 mr-2 me-4">Host*</Form.Label>
            <Form.Control type="input" />
          </Col>
          <Col sm="2" className="d-flex align-items-center">
            <Button variant="outline-dark">Host선택</Button>
          </Col>
          <Col sm="3" className="d-flex align-items-center">
            <Form.Label className="mb-0 mr-2 me-4">Service Hub*</Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Yes"
              checked={seviceHub === "O"}
              onChange={() => setServiceHub("O")}
            />
            <Form.Check
              inline
              type="radio"
              label="No"
              checked={seviceHub === "N"}
              onChange={() => setServiceHub("N")}
            />
          </Col>
          <Col sm="5" className="d-flex align-items-center">
            <Form.Label className="mb-0 mr-2 me-4">Scheme*</Form.Label>
            <Form.Select
              className="me-3"
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}>
              <option vlaue="">Select</option>
              <option vlaue="Action">HTTP++</option>
              <option vlaue="HTTP+">HTTP+</option>
              <option vlaue="HTTP++">HTTP++</option>
              <option vlaue="HTTP+POLL">HTTP+POLL</option>
              <option vlaue="HTTP">HTTP</option>
              <option vlaue="Mail">Mail</option>
              <option vlaue="SMS+">SMS+</option>
              <option vlaue="SMS">SMS</option>
              <option vlaue="USSD">USSD</option>
              <option vlaue="Voice">Voice</option>
              <option vlaue="Web">Web</option>
            </Form.Select>
            <Form.Label className="mb-0 mr-2 me-4">Method*</Form.Label>
            <Form.Select
              className="me-3"
              value={method}
              onChange={(e) => setMethod(e.target.value)}>
              <option vlaue="">Select</option>
              <option vlaue="GET">GET</option>
              <option vlaue="POST">POST</option>
              <option vlaue="PUT">PUT</option>
              <option vlaue="DELETE">DELETE</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="uri/topic">
          <Form.Label column sm="1">
            URI/TOPIC*
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="input"
              value={uriTopic}
              onChange={(e) => setUriTopic(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
      <br />
      <Row>
        <h5>◆ Request Contents Infomation</h5>
      </Row>
      <br />
      <Row>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="Request">
            <Col sm="7" className="d-flex align-items-center">
              <Form.Label className="mb-0 mr-2 me-4">
                Request Content Type*
              </Form.Label>
              <Form.Select
                className="me-3"
                value={reqContType}
                onChange={(e) => setReqContType(e.target.value)}>
                <option vlaue="">Select</option>
                <option vlaue="application/json">application/json</option>
                <option vlaue="application/json;charset=UTF-8">
                  application/json;charset=UTF-8
                </option>
                <option vlaue="Application/x-www-form-urlencoded">
                  Application/x-www-form-urlencoded
                </option>
              </Form.Select>
            </Col>
            <Col sm="5" className="d-flex justify-content-center">
              <Form.Label className="mb-0 mr-2 me-4">Entity Type*</Form.Label>
              <Form.Control
                type="input"
                value={entityType1}
                onChange={(e) => setEntityType1(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <br />
      <Row>
        <h5>◆ Response Contents Infomation</h5>
      </Row>
      <br />
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="Response">
          <Col sm="7" className="d-flex align-items-center">
            <Form.Label className="mb-0 mr-2 me-4">
              Response Content Type*
            </Form.Label>
            <Form.Select
              className="me-3"
              value={respContType}
              onChange={(e) => setRespContType(e.target.value)}>
              <option vlaue="">Select</option>
              <option vlaue="application/json">application/json</option>
              <option vlaue="application/json;charset=UTF-8">
                application/json;charset=UTF-8
              </option>
              <option vlaue="Application/x-www-form-urlencoded">
                Application/x-www-form-urlencoded
              </option>
            </Form.Select>
          </Col>
          <Col sm="5" className="d-flex justify-content-center">
            <Form.Label className="mb-0 mr-2 me-4">Entity Type*</Form.Label>
            <Form.Control
              type="input"
              value={entityType2}
              onChange={(e) => setEntityType2(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end">
          <Button variant="outline-dark me-2" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button variant="outline-dark" onClick={confirmSave}>
            등록
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddServiceMessageForm;
