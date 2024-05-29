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
import {
  useEntityListQuery,
  useEntityUpdataQuery,
} from "../../../../hooks/useEntityList";

const AddBaseInfo = () => {
  const { data, refetch } = useEntityListQuery();
  const [show, setShow] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedEntityDescription, setSelectedEntityDescription] =
    useState("");
  const [entityName, setEntityName] = useState("");
  const [descriptionKor, setDescriptionKor] = useState("");
  const [descriptionEng, setDescriptionEng] = useState("");
  const [keyForms, setKeyForms] = useState([
    {
      keyName: "",
      optional: "",
      valueType: "",
      format: "",
      sample: "",
      keyDescriptionKor: "",
      keyDescriptionEng: "",
      entityDisabled: false,
    },
  ]);

  const selectEntity = () => {
    setShow(true);
    console.log("show", show);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSelect = (entityName, entityDescription) => {
    setSelectedEntity(entityName);
    setSelectedEntityDescription(entityDescription);
  
    // 엔티티가 선택된 후 버튼을 비활성화
    const newKeyForms = keyForms.map((form) => {
      if (form.valueType === "Object") {
        form.entityDisabled = true;
      }
      return form;
    });
    setKeyForms(newKeyForms);
  
    handleClose();
  };

  const duplConfirm = () => {
    if (data.some((entity) => entity.name === entityName)) {
      alert("중복된 Entity Name입니다. 다시 작성해 주세요.");
      setEntityName(""); // 인풋창 리셋
    } else {
      alert("사용 가능한 Entity Name입니다.");
    }
    console.log("중복확인");
  };

  const keyDuplConfirm = (index) => {
    let isDuplicate = false;
    for (let entity of data) {
      if (
        entity.table.some((key) =>
          key.keyName.includes(keyForms[index].keyName)
        )
      ) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) {
      alert("중복된 Key Name입니다. 다시 작성해 주세요.");
      const newKeyForms = [...keyForms];
      newKeyForms[index].keyName = ""; // 인풋창 리셋
      setKeyForms(newKeyForms);
    } else {
      alert("사용 가능한 Key Name입니다.");
    }
  };

  const { mutate: addEntity } = useEntityUpdataQuery({
    onSuccess: () => {
      refetch(); // 데이터 재요청
    },
  });

  const handleSave = () => {
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    const newEntityData = {
      id: (data?.length ? String(Math.max(...data.map((row) => row.id)) + 1) : "1"),
      name: entityName,
      description: descriptionKor,
      pass: "",
      state: "",
      table: keyForms.map((form) => ({
        keyName: [form.keyName],
        valueType: form.valueType,
        format: form.valueType === "Object" ? "" : form.format,
        sample: form.valueType === "Object" ? "" : form.sample,
        description:
          form.valueType === "Object"
            ? selectedEntityDescription
            : form.keyDescriptionKor,
        optional: form.optional,
      })),
    };
    addEntity(newEntityData);
    resetForm();
    setShowConfirmModal(false);
  };

  const getNewEntityData = () => {
    return {
      id: (data?.length ? String(Math.max(...data.map((row) => row.id)) + 1) : "1"),
      name: entityName,
      description: descriptionKor,
      pass: "",
      state: "",
      table: keyForms.map((form) => ({
        keyName: [form.keyName],
        valueType: form.valueType,
        format: form.valueType === "Object" ? "" : form.format,
        sample: form.valueType === "Object" ? "" : form.sample,
        description:
          form.valueType === "Object"
            ? selectedEntityDescription
            : form.keyDescriptionKor,
        optional: form.optional,
      })),
    };
  };

  const newEntityCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setEntityName("");
    setDescriptionKor("");
    setDescriptionEng("");
    setKeyForms([
      {
        keyName: "",
        optional: "",
        valueType: "",
        format: "",
        sample: "",
        keyDescriptionKor: "",
        keyDescriptionEng: "",
        entityDisabled: false,
      },
    ]);
    setSelectedEntity("");
    setSelectedEntityDescription("");
  };

  const addKeyForm = () => {
    setKeyForms([
      ...keyForms,
      {
        keyName: "",
        optional: "",
        valueType: "",
        format: "",
        sample: "",
        keyDescriptionKor: "",
        keyDescriptionEng: "",
        entityDisabled: false,
      },
    ]);
  };

  const deleteKeyForm = (index) => {
    if (keyForms.length > 1) {
      setKeyForms(keyForms.filter((_, i) => i !== index));
    }
  };

  const updateKeyForm = (index, key, value) => {
    const newKeyForms = [...keyForms];
    newKeyForms[index][key] = value;

    if (key === "valueType" && value === "Object") {
      newKeyForms[index].entityDisabled = false; // Object 선택 시 버튼 활성화
    } else if (key === "valueType") {
      newKeyForms[index].entityDisabled = true; // 다른 값 선택 시 버튼 비활성화
      newKeyForms[index].keyDescriptionKor = "";
      newKeyForms[index].keyDescriptionEng = "";
      setSelectedEntity("");
      setSelectedEntityDescription("");
    }

    setKeyForms(newKeyForms);
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

            <Form.Group as={Row} className="mb-2" controlId="descriptionKor">
              <Col sm="12">
                <Form.Control
                  as="textarea"
                  placeholder="Description(KOR)*"
                  value={descriptionKor}
                  onChange={(e) => setDescriptionKor(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2" controlId="descriptionEng">
              <Col sm="12">
                <Form.Control
                  as="textarea"
                  placeholder="Description(ENG)*"
                  value={descriptionEng}
                  onChange={(e) => setDescriptionEng(e.target.value)}
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
        {keyForms.map((form, index) => (
          <Row key={index}>
            <Col sm="10">
              <Row>
                <Form className="input">
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId={`keyName${index}`}>
                    <Col sm="5">
                      <Form.Control
                        type="text"
                        placeholder="Key Name*"
                        value={form.keyName}
                        onChange={(e) =>
                          updateKeyForm(index, "keyName", e.target.value)
                        }
                      />
                    </Col>
                    <Col sm="2">
                      <Button
                        variant="outline-dark"
                        onClick={() => keyDuplConfirm(index)}>
                        중복 확인
                      </Button>
                    </Col>
                    <Col sm="5">
                      <Row>
                        <Col sm="4">Optional*</Col>
                        <Col sm="4">
                          <Form.Check
                            type="radio"
                            label="Optional"
                            name={`optional${index}`}
                            checked={form.optional === "O"}
                            onChange={() =>
                              updateKeyForm(index, "optional", "O")
                            }
                          />
                        </Col>
                        <Col sm="4">
                          <Form.Check
                            type="radio"
                            label="Mandatory"
                            name={`optional${index}`}
                            checked={form.optional === "M"}
                            onChange={() =>
                              updateKeyForm(index, "optional", "M")
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form className="input">
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId={`valueType${index}`}>
                    <Col sm="5">
                      <Form.Select
                        value={form.valueType}
                        onChange={(e) =>
                          updateKeyForm(index, "valueType", e.target.value)
                        }>
                        <option>Value Type*</option>
                        <option value="String">String</option>
                        <option value="Integer">Integer</option>
                        <option value="Double">Double</option>
                        <option value="Pattern">Pattern</option>
                        <option value="Object">Object</option>
                      </Form.Select>
                    </Col>
                    <Col sm="2">
                      <Button
                        variant="outline-dark"
                        onClick={selectEntity}
                        disabled={form.entityDisabled}>
                        Entity 선택
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
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId={`format${index}`}>
                    <Col sm="12">
                      <Form.Control
                        as="textarea"
                        placeholder="Format"
                        value={form.format}
                        onChange={(e) =>
                          updateKeyForm(index, "format", e.target.value)
                        }
                        disabled={form.valueType === "Object"}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId={`sample${index}`}>
                    <Col sm="12">
                      <Form.Control
                        type="text"
                        placeholder="Sample*"
                        value={form.sample}
                        onChange={(e) =>
                          updateKeyForm(index, "sample", e.target.value)
                        }
                        disabled={form.valueType === "Object"}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId={`descriptionKor${index}`}>
                    <Col sm="12">
                      <Form.Control
                        as="textarea"
                        placeholder="Description(KOR)*"
                        value={
                          form.valueType === "Object"
                            ? selectedEntityDescription
                            : form.keyDescriptionKor
                        }
                        onChange={(e) =>
                          updateKeyForm(
                            index,
                            "keyDescriptionKor",
                            e.target.value
                          )
                        }
                        disabled={form.valueType === "Object"}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-2"
                    controlId={`descriptionEng${index}`}>
                    <Col sm="12">
                      <Form.Control
                        as="textarea"
                        placeholder="Description(ENG)*"
                        value={form.keyDescriptionEng}
                        onChange={(e) =>
                          updateKeyForm(
                            index,
                            "keyDescriptionEng",
                            e.target.value
                          )
                        }
                        disabled={form.valueType === "Object"}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Row>
            </Col>
            <Col sm="2">
              <Button className="mb-2" onClick={addKeyForm}>
                Key 추가
              </Button>
              <Button
                onClick={() => deleteKeyForm(index)}
                disabled={keyForms.length === 1}>
                Key 삭제
              </Button>
            </Col>
          </Row>
        ))}
        <Row className="mb-2">
          <Col>
            <Button variant="outline-dark" onClick={newEntityCancel}>
              취소
            </Button>
            <Button variant="outline-dark" onClick={handleSave}>
              등록
            </Button>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Entity List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {data?.map((item, idx) => (
                <ListGroup.Item
                  action
                  key={idx}
                  onClick={() => handleSelect(item.name, item.description)}>
                  <Row>
                    <Col sm="4">
                      <div>{item.name}</div>
                    </Col>
                    <Col sm="8">
                      <div>{item.description}</div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Entity 내용 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>{JSON.stringify(getNewEntityData(), null, 2)}</pre>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={confirmSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddBaseInfo;
