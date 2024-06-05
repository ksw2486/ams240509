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
import AddStatusForm from "./page/status-mng/AddStatusForm";
import StatusCodeDetail from "./page/status-mng/StatusCodeDetail";
import StatusCodeUpdate from "./page/status-mng/StatusCodeUpdate";
import ServiceMessageMng from "./page/service-message-mng/ServiceMessageMng";
import ServiceMessageDetail from "./page/service-message-mng/ServiceMessageDetail";
import ServiceMessageUpdate from "./page/service-message-mng/ServiceMessageUpdate";
import AddServiceMessageForm from "./page/service-message-mng/AddServiceMessageForm";

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
          <Route path="status">
            <Route index element={<StatusMng />} />
            <Route path="addStatusForm" element={<AddStatusForm />} />
            <Route path=":id" element={<StatusCodeDetail />} />
            <Route path=":id/update" element={<StatusCodeUpdate />} />
          </Route>
          <Route path="/header" element={<HeaderMng />} />
          <Route path="/host" element={<HostMng />} />
          <Route path="data">
            <Route path="provisoning-table" element={<ProvisioningTable />} />
            <Route path="scheme" element={<Scheme />} />
            <Route path="principal" element={<Principal />} />
          </Route>
          <Route path="service-message" element={<ServiceMessageMng />}>
            <Route path=":id" element={<ServiceMessageDetail />} />
            <Route path=":id/update" element={<ServiceMessageUpdate />} />
          </Route>
          <Route
            path="service-message/addServiceMessageForm"
            element={<AddServiceMessageForm />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
