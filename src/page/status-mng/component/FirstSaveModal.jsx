import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const FirstSaveModal = (props) => {
  console.log("firstSaveModal", props);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show} // Add this line
      onHide={props.onHide} // Add this line
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">변경이력</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>일시</th>
              <th>변경이력</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.changedDate}</td>
              <td>{props.content}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FirstSaveModal;
