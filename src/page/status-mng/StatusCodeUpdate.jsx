import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  useStatusCodeListQuery,
  useStatusCodeUpdataQuery,
} from "../../hooks/useStatusCodeList";
import { useNavigate, useParams } from "react-router-dom";

const StatusCodeUpdate = () => {
  const [statusCode, setStatusCode] = useState("");
  const [reasonPhraseKr, setReasonPhraseKr] = useState("");
  const [reasonPhraseEng, setReasonPhraseEng] = useState("");
  const [descriptionKr, setDescriptionKr] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [httpStandard, setHttpStandard] = useState("");
  const [statusCodeForms, setStatuscodeForms] = useState([
    {
      statusCode: "",
      reasonPhraseKr: "",
      reasonPhraseEng: "",
      httpStandard: "",
      descriptionKr: "",
      descriptionEng: "",
      state: "",
      firstDate: "",
      initialRegistration: "",
      updateTime: "",
      updateRegistration: "",
      history: [],
    },
  ]);
  const { data } = useStatusCodeListQuery();
  const { id } = useParams();
  const oldData = data ? data[id - 1] : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (oldData) {
      setStatusCode(oldData.statusCode);
      setReasonPhraseKr(oldData.reasonPhraseKr);
      setReasonPhraseEng(oldData.reasonPhraseEng);
      setDescriptionKr(oldData.descriptionKr);
      setDescriptionEng(oldData.descriptionEng);
      setHttpStandard(oldData.httpStandard); // 초기화
    }
  }, [oldData]);

  const { mutate: addStatusCode } = useStatusCodeUpdataQuery();

  const resetForm = () => {
    setStatusCode("");
    setReasonPhraseKr("");
    setReasonPhraseEng("");
    setHttpStandard("");
    setDescriptionKr("");
    setDescriptionEng("");
  };

  const confirmSave = () => {
    const newStatusCode = {
      id: data?.length
        ? String(Math.max(...data.map((row) => row.id)) + 1)
        : "1",
      statusCode: statusCode,
      reasonPhraseKr: reasonPhraseKr,
      reasonPhraseEng: reasonPhraseEng,
      descriptionKr: descriptionKr,
      descriptionEng: descriptionEng,
    };
    addStatusCode(newStatusCode);
    resetForm();
  };
  return (
    <Container>
      <br />
      <Row>
        <h3>| Status Code 수정</h3>
      </Row>
      <br />
      <Row className="mb-2">
        <h4>◆ 기본정보</h4>
      </Row>
      <Row className="mb-2">
        <Form className="input">
          <Form.Group as={Row} className="mb-2" controlId="statusCode">
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder="Status Code*"
                value={statusCode}
                onChange={(e) => setStatusCode(e.target.value)}
              />
            </Col>
            <Col sm="7">
              <Row>
                <Col>HTTP Standard*</Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    checked={httpStandard === "O"}
                    onChange={() => setHttpStandard("O")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="No"
                    checked={httpStandard === "N"}
                    onChange={() => setHttpStandard("N")}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="reasonPhraseKor">
            <Col sm="12">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Reason Phrase(KOR)*"
                value={reasonPhraseKr}
                onChange={(e) => setReasonPhraseKr(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="reasonPhraseEng">
            <Col sm="12">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Reason Phrase(ENG)*"
                value={reasonPhraseEng}
                onChange={(e) => setReasonPhraseEng(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="descriptionKor">
            <Col sm="12">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description(KOR)*"
                value={descriptionKr}
                onChange={(e) => setDescriptionKr(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2" controlId="descriptionEng">
            <Col sm="12">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description(ENG)*"
                value={descriptionEng}
                onChange={(e) => setDescriptionEng(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end">
          <Button variant="outline-dark me-2" onClick={()=>navigate(-1)}>취소</Button>
          <Button variant="outline-dark" onClick={confirmSave}>
            저장
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default StatusCodeUpdate;
