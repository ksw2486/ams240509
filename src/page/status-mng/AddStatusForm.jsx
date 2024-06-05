import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  useStatusCodeListQuery,
  useStatusCodeUpdataQuery,
} from "../../hooks/useStatusCodeList";
import { useNavigate } from "react-router-dom";
import FirstSaveModal from "./component/FirstSaveModal";

const AddStatusForm = () => {
  const [modalShow, setModalShow] = useState(false);
  const [statusCode, setStatusCode] = useState("");
  const [reasonPhraseKr, setReasonPhraseKr] = useState("");
  const [reasonPhraseEng, setReasonPhraseEng] = useState("");
  const [descriptionKr, setDescriptionKr] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [httpStandard, setHttpStandard] = useState("");
  const [content, setContent] = useState("");
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
  const { mutate: addStatusCode } = useStatusCodeUpdataQuery();
  const navigate = useNavigate();

  const resetForm = () => {
    setStatusCode("");
    setReasonPhraseKr("");
    setReasonPhraseEng("");
    setHttpStandard("");
    setDescriptionKr("");
    setDescriptionEng("");
  };

  const confirmSave = () => {
    setContent(`Status Code ${statusCode} : 최초등록`);
    setModalShow(true);
  };

  const handleModalConfirm = () => {
    const newStatusCode = {
      id: data?.length
        ? String(Math.max(...data.map((row) => row.id)) + 1)
        : "1",
      statusCode: statusCode,
      firstDate: formattedDateTime,
      reasonPhraseKr: reasonPhraseKr,
      reasonPhraseEng: reasonPhraseEng,
      httpStandard: httpStandard,
      descriptionKr: descriptionKr,
      descriptionEng: descriptionEng,
      history: [
        {
          changedDate: formattedDateTime,
          content: content,
        },
      ],
    };
    addStatusCode(newStatusCode);
    resetForm();
    setModalShow(false);
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
  return (
    <Container>
      <br />
      <Row>
        <h3>| Status Code 등록</h3>
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
            <Col sm="2">
              <Button variant="outline-dark">중복확인</Button>
            </Col>
            <Col sm="5">
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
          <Button variant="outline-dark me-2" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button variant="outline-dark" onClick={confirmSave}>
            등록
          </Button>
        </Col>
      </Row>
      <FirstSaveModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={handleModalConfirm}
        changedDate={formattedDateTime}
        content={content}
      />
    </Container>
  );
};

export default AddStatusForm;
