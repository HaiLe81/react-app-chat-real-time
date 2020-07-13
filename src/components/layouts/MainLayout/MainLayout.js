import React from "react";
import { HomePage } from "../../../containers/index";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      {/* <HeaderV2 title="QR team" /> */}
      <HomePage />
      {children}
    </div>
  );
}

export default MainLayout;
