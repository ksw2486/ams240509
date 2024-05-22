import React from "react";
import { useEntityListQuery } from "../../../../hooks/useEntityList";
import { Button, ListGroup, Modal } from "react-bootstrap";

const EntityModal = ({show, setShow}) => {
  const { data } = useEntityListQuery();

  const handleClose = ()=>{setShow(false)}
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Entity List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {data?.map((item, idx) => (
              <ListGroup.Item action key={idx}>
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
  );
};

export default EntityModal;
