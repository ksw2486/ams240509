import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
// import AppSidebar from "./AppSidebar";
import {
  App,
  Archive,
  Bag,
  Bing,
  DoorOpen,
  Sticky,
} from "react-bootstrap-icons";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const AppLayout = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  return (
    <div>
      <Container fluid="true">
        <Row>
          <AppNavbar />
        </Row>
        <Row>
          <Col sm="auto">
            <div
              style={{ display: "flex", height: "100%", minHeight: "800px" }}>
              <Sidebar collapsed={collapsed} backgroundColor="whtie">
                <Menu>
                  <MenuItem
                    icon={<DoorOpen />}
                    onClick={() => setCollapsed(!collapsed)}></MenuItem>

                  <SubMenu label="API 관리" icon={<Bing />}>
                    <MenuItem> Pie charts</MenuItem>
                    <MenuItem> Line charts</MenuItem>
                    <MenuItem> Bar charts</MenuItem>
                  </SubMenu>

                  <MenuItem
                    active
                    icon={<Archive />}
                    component={<Link to="/entity" />}>
                    Entity 관리
                  </MenuItem>

                  <MenuItem icon={<App />} component={<Link to="/status" />}>
                    Status Code 관리
                  </MenuItem>

                  <MenuItem icon={<Bag />} component={<Link to="/header" />}>
                    Header 관리
                  </MenuItem>

                  <MenuItem icon={<Sticky />} component={<Link to="/host" />}>
                    Host 관리
                  </MenuItem>
                </Menu>
              </Sidebar>
            </div>
          </Col>
          <Col sm="auto">
            <Outlet />
          </Col>
        </Row>
      </Container>

      {/* <Outlet /> */}
    </div>
  );
};

export default AppLayout;
