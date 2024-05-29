import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./page/homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import EntityMng from "./page/entity-mng/EntityMng";
import StatusMng from "./page/status-mng/StatusMng";
import AppLayout from "./layout/AppLayout";
import HeaderMng from "./page/header-mng/HeaderMng";
import HostMng from "./page/host-mng/HostMng";
import EntityDetail from "./page/entity-mng/EntityDetail";
import NewEntity from "./page/entity-mng/NewEntity";
import ProvisioningTable from "./page/data-mng/ProvisioningTable";
import Scheme from "./page/data-mng/Scheme";
import Principal from "./page/data-mng/Principal";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="entity" element={<EntityMng />}>
            <Route path=":id" element={<EntityDetail />} />
            <Route path="newEntity" element={<NewEntity />} />
          </Route>
          <Route path="/status" element={<StatusMng />} />
          <Route path="/header" element={<HeaderMng />} />
          <Route path="/host" element={<HostMng />} />
          <Route path="data">
            <Route path="provisoning-table" element={<ProvisioningTable />} />
            <Route path="scheme" element={<Scheme />} />
            <Route path="principal" element={<Principal />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
