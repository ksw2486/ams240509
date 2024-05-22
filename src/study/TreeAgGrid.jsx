import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
  } from "react";  
  import { AgGridReact } from "ag-grid-react";
  import "ag-grid-charts-enterprise";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-quartz.css";
  import "./styles.css";
  import {getData} from "./data"

const TreeAgGrid = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
      // we're using the auto group column by default!
      { field: "jobTitle" },
      { field: "employmentType" },
    ]);
    const defaultColDef = useMemo(() => {
      return {
        flex: 1,
      };
    }, []);
    const autoGroupColumnDef = useMemo(() => {
      return {
        headerName: "Organisation Hierarchy",
        minWidth: 300,
        cellRendererParams: {
          suppressCount: true,
        },
      };
    }, []);
    const getDataPath = useCallback((data) => {
      return data.orgHierarchy;
    }, []);
  
    const onFilterTextBoxChanged = useCallback(() => {
      gridRef.current.api.setGridOption(
        "quickFilterText",
        document.getElementById("filter-text-box").value,
      );
    }, []);
  


  return (
    <div style={containerStyle}>
    <div className="example-wrapper">
      <div style={{ marginBottom: "5px" }}>
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
      </div>

      <div
        style={gridStyle}
        className={
          "ag-theme-quartz-dark"
        }
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          treeData={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
        />
      </div>
    </div>
  </div>
  )
}

export default TreeAgGrid
