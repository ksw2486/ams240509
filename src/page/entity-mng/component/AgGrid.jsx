import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import {
  useEntityListQuery,
  useEntityUpdataQuery,
} from "../../../hooks/useEntityList";

const AgGrid = () => {
  const { data } = useEntityListQuery();
  console.log("aggrid", data);

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  console.log("rowData", rowData);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", filter: true },
    { field: "pass", filter: true },
    { field: "state", filter: true },
    { field: "description" },
    // { field: "table.key", headerName:'Key' },
    // {
    //   valueGetter: (params) => {
    //     return params.data.name;
    //   },
    //   valueSetter: (params) => {
    //     params.data.name = params.newValue;
    //   },
    // },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return { sortable: true, editable: true };
  }, []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from server
  // useEffect(() => {
  //   fetch("http://localhost:3004/entity")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const deletRow = () => {
    const selectedData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedData });
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.table("Row Data:", rowData);
    return setRowData(rowData);
  };

  const { mutate } = useEntityUpdataQuery();

  // const updateItems = () => {
  //   const itemsToUpdate = [];
  //   gridRef.current.api.forEachNode((rowNode, index) => {
  //     const data = rowNode.data;
  //     itemsToUpdate.push(data);
  //   });
  //   gridRef.current.api.applyTransaction({ update: itemsToUpdate });
  //   console.log(itemsToUpdate);
  //   // mutate(itemsToUpdate)
  // };
  const updateItems = async () => {
    const itemsToUpdate = [];
    gridRef.current.api.forEachNode((rowNode) => {
      const data = rowNode.data;
      itemsToUpdate.push(data);
    });

    try {
      const updatedItems = await mutate(itemsToUpdate);
      // mutate 함수를 사용하여 서버에 업데이트 요청을 보냄
      // 성공적으로 업데이트된 경우, 데이터를 갱신하거나 다시 불러올 수 있음
      console.log("Items updated successfully:", updatedItems);
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>
      <button onClick={deletRow}>delet</button>
      <button onClick={updateItems}>update</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-quartz" style={{ width: 800, height: 500 }}>
        <AgGridReact
          editable={true}
          ref={gridRef} // Ref for accessing Grid's API
          rowData={data} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          //   animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          // rowSelection={"single"}
        />
      </div>
    </div>
  );
};

export default AgGrid;
