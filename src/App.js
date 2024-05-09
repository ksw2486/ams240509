import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./page/homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import EntityMng from "./page/entity-mng/EntityMng";
import StatusMng from "./page/status-mng/StatusMng";
import AppLayout from "./layout/AppLayout";
import HeaderMng from "./page/header-mng/HeaderMng";
import HostMng from "./page/host-mng/HostMng";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage/>}/>
          <Route path="/entity" element={<EntityMng/>}/>
          <Route path="/status" element={<StatusMng/>}/>
          <Route path="/header" element={<HeaderMng/>}/>
          <Route path="/host" element={<HostMng/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
