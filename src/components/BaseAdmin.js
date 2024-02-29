import React from "react";
import CustomNavbarAdmin from "./CustomNavbarAdmin";

const BaseAdmin = ({ title = "Welcome to Admin", children }) => {
  return (
  
    <div  className="container-fluid p-0 m-0">
      <CustomNavbarAdmin/>
      {children}
    </div>
  
  );
};

export default BaseAdmin;
