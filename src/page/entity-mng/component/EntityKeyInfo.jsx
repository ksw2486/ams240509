import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEntityKeyInfoQuery } from "../../../hooks/useEntityList";
import { GridOptions } from "ag-grid-community";
import "ag-grid-enterprise";
import { useParams } from "react-router-dom";

const EntityKeyInfo = () => {
  const gridRef = useRef();
  const { data } = useEntityKeyInfoQuery();
  console.log("entity-key-info", data);
  const { id } = useParams();
  console.log("entity-key-ID", id);

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    // { field: "keyName" },
    { field: "valueType" },
    { field: "format" },
    { field: "sample" },
    { field: "description" },
    { field: "optional" },
  ]);

  console.log("rowData", rowData);
  useEffect(() => {
    console.log("useEffect called", data, id);
    if (data && data[id]) {
      const newData = data && data[id].table;
      console.log("newdata", newData);
      setRowData(newData);
    }
    //else if (data && !data[id]) {
    //   console.error("error");
    // }
  }, [data, id]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      editable: true,
      flex: 1,
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Key",
      minWidth: 200,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);
  
  const getDataPath = useCallback((rowData) => {
    console.log("getData",[rowData.keyName])
    return rowData.keyName;
  }, []);

  return (
    <div>
      <br />
      <h4> | Entity Key Infomation</h4>
      <div className="ag-theme-quartz" style={{ height: 500, width: 900 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection={"multiple"}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          treeData={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
        />
      </div>
    </div>
  );
};

export default EntityKeyInfo;
