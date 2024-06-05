import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const MoreModal = (props) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show} // Add this line
      onHide={props.onHide} // Add this line
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.description ? "Description" : "변경이력"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.description && (
          <>            
            <p>{props.description}</p>
          </>
        )}
        {props.history && props.history.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>일시</th>
                  <th>변경이력</th>
                </tr>
              </thead>
              <tbody>
                {props.history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.changedDate}</td>
                    <td>{item.content}</td>
                  </tr>
                ))}
              </tbody>
            </Table>            
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoreModal;
