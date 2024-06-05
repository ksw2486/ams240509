import React, { useEffect, useState } from "react";
import { useStatusCodeListQuery } from "../../../hooks/useStatusCodeList";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StatusList.style.css";
import MoreModal from "./MoreModal";
import { useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs"; // 아이콘 임포트

const StatusList = () => {
  const { data } = useStatusCodeListQuery();
  console.log("status-data", data);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checkUsing, setCheckUsing] = useState(true);
  const [searchNm, setSearchNm] = useState("");
  const [searchAdminNm, setSearchAdminNm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedHistory, setSelectedHistory] = useState([]);

  const navigate = useNavigate();
  const moveStatusForm = () => {
    navigate("/status/addStatusForm");
  };

  const handleRowClick = (id) => {
    navigate(`/status/${id}`);
  };

  const resetBtn = () => {
    setStartDate(null);
    setEndDate(null);
    setCheckUsing(true);
    setSearchNm("");
    setSearchAdminNm("");
  };

  useEffect(() => {
    console.log(
      "시작일, 종료일, 사용여부, 이름검색, 등록수정자이름검색",
      startDate,
      endDate,
      checkUsing,
      searchNm,
      searchAdminNm
    );
  }, [startDate, endDate, checkUsing, searchNm, searchAdminNm]);

  return (
    <div>
      <br />
      <div className="d-flex align-items-center">
        <h3 className="me-3">| Status Code</h3>
        <OverlayTrigger
          placement="right"
          // style={{ maxWidth: "1200px", fontSize: "1rem" }}
          overlay={
            <Tooltip id="pencil-tooltip" className="custom-tooltip">
              HTTP Response Status Code is followed to standard code and guide
              in HTTP 1.1. (http://tools.letf.org/html/rfc2616#page-39)
              {"\n"}
              Status Code is defined as follows, depending on the scope, and
              even if Custom code is defined, it should be defined according to
              this scope.
              {"\n"}
              {"\n"} - 2xx : Success
              {"\n"} - 4xx : Client Error
              {"\n"} - 5xx : Server Error
              {"\n"}
              {"\n"} Generally Status Codes are used as Request method like
              follows.
            </Tooltip>
          }>
          <h4>
            <BsPencilFill />
          </h4>
        </OverlayTrigger>
      </div>
      <br />
      <Container className="status-search">
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>등록/수정 시작일</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="시작일"
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>등록/수정 종료일</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="종료일"
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="checkUsing">
                <Form.Label>사용여부</Form.Label>
                <Form.Select
                  aria-label="사용여부 선택"
                  value={checkUsing ? "1" : "2"}
                  onChange={(e) => setCheckUsing(e.target.value === "1")}>
                  <option value="1">사용</option>
                  <option value="2">미사용</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="searchNm">
                <Form.Label>Host명</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Host명"
                  value={searchNm}
                  onChange={(e) => setSearchNm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="searchAdminNm">
                <Form.Label>등록/수정자이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="등록/수정자이름"
                  value={searchAdminNm}
                  onChange={(e) => setSearchAdminNm(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={resetBtn}>
                초기화
              </Button>
              &nbsp;
              <Button variant="outline-success" type="submit">
                검색
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <br />
      <Container>
        <div className="addButton">
          <Button variant="outline-dark" onClick={moveStatusForm}>
            Status Code 등록
          </Button>
        </div>
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
              {/* <th>ETC</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <React.Fragment key={item.id}>
                <tr
                  className="text-style"
                  onClick={() => handleRowClick(item.id)}>
                  <td>{item.statusCode}</td>
                  <td>{item.reasonPhraseKr}</td>
                  <td>{item.httpStandard}</td>
                  <td>
                    <Button
                      variant="outline-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalShow(true);
                        setSelectedDescription(item.descriptionKr);
                        setSelectedHistory([]);
                      }}>
                      더보기
                    </Button>
                  </td>
                  <td>{item.state}</td>
                  <td>{item.firstDate}</td>
                  <td>{item.initialRegistration}</td>
                  <td>{item.updateTime}</td>
                  <td>{item.updateRegistration}</td>
                  <td>
                    <Button
                      variant="outline-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalShow(true);
                        setSelectedHistory(item.history);
                        setSelectedDescription("");
                      }}>
                      더보기
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
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

export default StatusList;
