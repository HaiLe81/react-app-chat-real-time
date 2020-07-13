import React from "react";
import "./MenuOption.css";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import { LogOut } from "../../redux/auth/auth-actions";
import { removeCookie } from "../../redux/cookie/cookie-service";
import { globals } from "../../configs";

function MenuOption({ isOpen, istoggle, user, LogOut, open }) {
  const logout = () => {
    LogOut();
    removeCookie(globals.env.COOKIE_KEY);
  };
  return (
    isOpen && (
      <div className="wrapper-menu">
        <div className="content-option">
          <div className="contents t-content">
            <Avatar shape="square" size={"small"} icon={<UserOutlined />} />
            <p>{user.fullname}</p>
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
              <li onClick={logout}>Sign out</li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: () => {
      dispatch(LogOut());
    },
  };
};

export default connect(null, mapDispatchToProps)(MenuOption);
