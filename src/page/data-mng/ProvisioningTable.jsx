import React, { useEffect, useMemo, useRef, useState } from "react";
import { useProvisioningListQuery } from "../../hooks/useProvisioning";
import { AgGridReact } from "ag-grid-react";
import { Container } from "react-bootstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ProvisioningTable = () => {
  const gridRef = useRef();
  const { data } = useProvisioningListQuery();
  console.log("provisoning-data", data);

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "parameter" },
    { field: "description" },
    { field: "factoryValue" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      editable: true,
      flex: 1,
      autoHeight: true,
      resizable: true, // 컬럼이 자동 크기 조정될 수 있도록 설정
    };
  }, []);

  const onGridReady = (params) => {
    const allColumnIds = colDefs.map((colDef) => colDef.field);
    params.columnApi.autoSizeColumns(allColumnIds); // 모든 컬럼의 크기를 자동으로 조정
  };

  return (
    <div className="mb-2">
      <br />
      <h3>[A1]Provisioning Table(Gen1)</h3>
      <br />
      {data?.map((item) => (
        <Container key={item.id}>
          <h5>{item.title}</h5>
          <div className="ag-theme-quartz" style={{ width: 1000 }}>
            <AgGridReact
              ref={gridRef}
              rowData={item.table} // 각 항목의 테이블 데이터를 rowData로 설정
              columnDefs={colDefs}
              rowSelection={"multiple"}
              defaultColDef={defaultColDef}
              groupDefaultExpanded={0} // 모든 그룹이 닫힌 상태로 설정
              defaultGroupExpanded={false}
              autoHeight={true}
              onGridReady={onGridReady} // 그리드가 준비되었을 때 호출
              domLayout="autoHeight" // 그리드 높이를 내용에 맞게 자동 조절
            />
          </div>
          <br />
        </Container>
      ))}
    </div>
  );
};

export default ProvisioningTable;
