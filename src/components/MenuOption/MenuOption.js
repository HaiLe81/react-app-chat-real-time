import React from "react";
import "./MenuOption.css";
import { Avatar } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";

function MenuOption({ isOpen, istoggle }) {
  return isOpen && (
    <div className="wrapper-menu">
      <div className="content-option">
        <div className="contents t-content">
          <Avatar shape="square" size={"small"} icon={<UserOutlined />} />
          <p>HaiLe</p>
        </div>
        <div className="contents">
          <div className="wrapper-status">
            <SmileOutlined />
            Update your status
          </div>
        </div>
        <div className="option">
          <ul>
            <li onClick={istoggle}>View Project</li>
            <li>Preferences</li>
            <li>Help</li>
            <li>Setting</li>
            <li>Sign out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuOption;
