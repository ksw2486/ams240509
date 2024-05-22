import React, { useMemo, useRef, useState } from "react";
import { useHeaderListQuery } from "../../../hooks/useHeaderList";
import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const HeaderTable = () => {
  const gridRef = useRef();
  const { data } = useHeaderListQuery();

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { header: "Key", field: "key" },
    { header: "Format", field: "format" },
    { header: "Sample", field: "sample" },
    { header: "Description", field: "description", flex: 4 },
    // { field: "item" },
  ]);
  useEffect(() => {
    if (data) {
      setRowData(data);
    }
  }, [data]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      editable: true,
      treeData: true,
    };
  }, []);

  return (
    <div>
      <br />
      <h4> | Header</h4>
      <div className="ag-theme-quartz" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          // animateRows={true}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiple"}
        />
      </div>
    </div>
  );
};

export default HeaderTable;
