import React from "react";
import { Outlet } from "react-router-dom";


const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Outlet/>
    </div>
  );
};

export default Homepage;
