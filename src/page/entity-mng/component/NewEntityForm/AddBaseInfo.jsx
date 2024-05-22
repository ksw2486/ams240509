import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import "./AddBaseInfo.style.css";
import EntityModal from "./EntityModal";
import {
  useEntityListQuery,
  useEntityUpdataQuery,
} from "../../../../hooks/useEntityList";

const AddBaseInfo = () => {
  const { data } = useEntityListQuery();
  const [show, setShow] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [entityName, setEntityName] = useState("");
  const [discriptKor, setDiscriptKor] = useState("");
  const [discriptEng, setDiscriptEng] = useState("");
  const [keyName, setKeyName] = useState("");
  const [optional, setOptional] = useState("");
  const [valueType, setValueType] = useState("");
  const [format, setFormat] = useState("");
  const [sample, setSample] = useState("");
  const [keyDiscriptKor, setKeyDiscriptKor] = useState("");
  const [keyDiscriptEng, setKeyDiscriptEng] = useState("");

  const selectEntity = () => {
    setShow(true);
    console.log("show", show);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSelect = (entityName) => {
    setSelectedEntity(entityName);
    handleClose();
  };

  const duplConfirm = () => {
    console.log("중복확인");
  };
  const { mutate: addEntity } = useEntityUpdataQuery();

  const newEntitySave = (e) => {
    e.preventDefault();
    const newEntityData = {
      id: data.length ? Math.max(...data.map((row) => row.id)) + 1 : 1,
      name: entityName,
      discript: discriptKor,
      // discriptEng: discriptEng,
      pass: "",
      state: "",
      table: [
        {
          keyName: [keyName],
          valueType: valueType,
          format: format,
          sample: sample,
          description: keyDiscriptKor,
          optional: optional,
          // keyDiscriptEng: keyDiscriptEng
        },
      ],
    };
    console.log("newEntityData", newEntityData);
    addEntity(newEntityData);
    setEntityName("");
    setDiscriptKor("");
    setDiscriptEng("");
    setKeyName("");
    setOptional("");
    setValueType("");
    setFormat("");
    setSample("");
    setKeyDiscriptKor("");
    setKeyDiscriptEng("");
    setSelectedEntity("");
  };

  const newEntityCancel = () => {
    console.log("cancel", "등록취소");
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <h4>◆ 기본정보</h4>
        </Row>
        <br />
        <Row>
          <Form className="input">
            <Form.Group as={Row} className="mb-2" controlId="entityName">
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Entity Name*"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="outline-dark" onClick={duplConfirm}>
                  중복확인
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="discriptionKor">
              <Col sm="12">
                <Form.Control
                  as="textarea"
                  placeholder="Discription(KOR)*"
                  value={discriptKor}
                  onChange={(e) => {
                    setDiscriptKor(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2" controlId="discriptionEng">
              <Col sm="12">
                <Form.Control
                  as="textarea"
                  placeholder="Discription(ENG)*"
                  value={discriptEng}
                  onChange={(e) => {
                    setDiscriptEng(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
        </Row>
        <br />
        <Row>
          <h4>◆ Key</h4>
        </Row>
        <br />
        <Row>
          <Col sm="10">
            <Row>
              <Form className="input">
                <Form.Group as={Row} className="mb-2" controlId="entityName">
                  <Col sm="5">
                    <Form.Control
                      type="text"
                      placeholder="Key Name*"
                      value={keyName}
                      onChange={(e) => {
                        setKeyName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col sm="2">
                    <Button variant="outline-dark">중복 확인</Button>
                  </Col>
                  <Col sm="5">
                    <Row>
                      <Col sm="4">Optional*</Col>
                      <Col sm="4">
                        <Form.Check
                          type="radio"
                          label="Optional"
                          name="O"
                          checked={optional === "O"}
                          onChange={() => setOptional("O")}
                        />
                      </Col>
                      <Col sm="4">
                        <Form.Check
                          type="radio"
                          label="Mandatory"
                          name="M"
                          checked={optional === "M"}
                          onChange={() => setOptional("M")}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              <Form className="input">
                <Form.Group as={Row} className="mb-2" controlId="valueType">
                  <Col sm="5">
                    <Form.Select>
                      <option>Value Type*</option>
                      <option value="1">String</option>
                      <option value="2">Intger</option>
                      <option value="3">Double</option>
                      <option value="4">Pattern</option>
                      <option value="5">Object</option>
                    </Form.Select>
                  </Col>
                  <Col sm="2">
                    <Button variant="outline-dark" onClick={selectEntity}>
                      Entity선택
                    </Button>
                  </Col>
                  <Col sm="5">
                    <Form.Control
                      type="text"
                      placeholder="Entity Name"
                      disabled
                      value={selectedEntity}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              <Form className="input">
                <Form.Group as={Row} className="mb-2" controlId="format">
                  <Col sm="12">
                    <Form.Control
                      as="textarea"
                      placeholder="Format"
                      value={format}
                      onChange={(e) => {
                        setFormat(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="sample">
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      placeholder="Sample*"
                      value={sample}
                      onChange={(e) => {
                        setSample(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="descriptionKor">
                  <Col sm="12">
                    <Form.Control
                      as="textarea"
                      placeholder="Discription(KOR)*"
                      value={keyDiscriptKor}
                      onChange={(e) => {
                        setKeyDiscriptKor(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="descriptionEng">
                  <Col sm="12">
                    <Form.Control
                      as="textarea"
                      placeholder="Discription(ENG)*"
                      value={keyDiscriptEng}
                      onChange={(e) => {
                        setKeyDiscriptEng(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Row>
            <Row className="mb-2">
              <Col>
                <Button variant="outline-dark" onClick={newEntityCancel}>
                  취소
                </Button>
                <Button variant="outline-dark" onClick={newEntitySave}>
                  등록
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm="2">
            <Button className="mb-2">Key 추가</Button>
            <Button>Key 삭제</Button>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Entity List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {data?.map((item, idx) => (
                <ListGroup.Item
                  action
                  key={idx}
                  onClick={() => handleSelect(item.name)}>
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddBaseInfo;
