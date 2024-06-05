import React, { useEffect, useState } from "react";
import { useStatusCodeListQuery } from "../../../hooks/useStatusCodeList";
import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const StatusList = () => {
  const { data } = useStatusCodeListQuery();
  console.log("data", data);
//   console.log("data-desc", data?.table[0].id);

//   const rowData = data?.table;
//   console.log("row", rowData);

  const [expandedRows, setExpandedRows] = useState({});
  const [tables, setTables] = useState([]);

  const toggleRowDetails = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  useEffect(() => {
    if (rowData) {
      const generateColumnDefs = (data) => {
        const columns = Object.keys(data[0])
          .filter(
            (key) =>
              !["id", "statusCode", "reasonPhrase", "description"].includes(
                key
              ) && data[0][key] !== ""
          ) // 특정 키 및 빈 값 제외
          .map((column) => ({ field: column })); // 컬럼 정의 생성
        return columns;
      };

      const newTables = rowData.map((row) => ({
        id: row.id,
        columnDefs: generateColumnDefs([row]),
        tableData: [row],
      }));

      setTables(newTables);
    }
  }, [rowData]);


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div>시작일</div>
          </Col>
          <Col>
            <div>종료일</div>
          </Col>
          <Col>
            <div>상태</div>
          </Col>
          <Col>
            <div>코드명</div>
          </Col>
          <Col>
            <div>등록자</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>초기화</Button>
          </Col>
          <Col>
            <Button>검색</Button>
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <h3>| Status Code</h3>
        <br />
        {/* <p>{data?.description}</p> */}
        <br />
        <Table>
          <thead>
            <tr>
              <th>Status Code</th>
              <th>Reason Phrase</th>
              <th>HTTP Standard</th>
              <th>Description</th>
              <th>상태</th>
              <th>등록일시</th>
              <th>등록자(사번)</th>
              <th>수정일시</th>
              <th>수정자(사번)</th>
              <th>변경이력</th>
              <th>ETC</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.statusCode}</td>
                  <td>{item.reasonPhraseKr}</td>
                  <td>{item.httpStandard}</td>
                  <td>{item.descriptionKr}</td>
                  <td>{item.state}</td>
                  <td>{item.firstDate}</td>
                  <td>{item.initialRegistration}</td>
                  <td>{item.updateTime}</td>
                  <td>{item.updateRegistration}</td>
                  <td>{item.history}</td>
                  <td onClick={() => toggleRowDetails(item.id)}>
                    <Button variant="outline-dark">
                      {expandedRows[item.id] ? "창닫기" : "더보기"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-0">
                    <Collapse in={expandedRows[item.id]}>
                      <div>
                        <Card body>
                          <p>테스트 입니다.</p>
                          <div
                            className="ag-theme-alpine"
                            style={{
                              height: 200,
                              width: 600,
                              marginBottom: 20,
                              // display: expandedRows[item.id] ? "block" : "none",
                            }}>
                            {tables
                              .filter((table) => table.id === item.id)
                              .map((table) => (
                                <AgGridReact
                                  key={table.id}
                                  rowData={table.tableData}
                                  columnDefs={table.columnDefs}
                                  defaultColDef={{ flex: 1 }}
                                  domLayout="autoHeight"
                                  // onGridReady={onGridReady} // 그리드가 준비되었을 때 호출
                                />
                              ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline-dark"
                            onClick={() => toggleRowDetails(item.id)}>
                            Hide Details
                          </Button>
                        </Card>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default StatusList;
