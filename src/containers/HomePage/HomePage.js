import React, { useState, useEffect } from "react";
import "./HomePage.css";
import "antd/dist/antd.css";
import { useSelector, connect } from "react-redux";
import { Layout, Menu, Avatar } from "antd";
import {
  FormOutlined,
  MenuOutlined,
  MessageOutlined,
  SnippetsOutlined,
  SaveOutlined,
  FileZipOutlined,
  CommentOutlined,
  DownOutlined,
  CloseOutlined,
  UserOutlined,
  EllipsisOutlined,
  EditOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  ModalAddChannel,
  MenuOption,
  Message,
  ModalJoinChannel,
} from "../../components";
import { FetchChannels } from "../../redux/channel/channel-actions";
import { axios, globals } from "../../configs";
import { getCookie } from "../../redux/cookie/cookie-service";

import socket from "../../socket/index";

const { Sider } = Layout;
const { SubMenu } = Menu;

function HomePage({ FetchChannels }) {
  useEffect(() => {
    const token = getCookie(globals.env.COOKIE_KEY);
    if (!token) return;
    axios.setAuthorization(token);
  }, []);
  useEffect(() => {
    FetchChannels();
  }, [FetchChannels]);

  useEffect(() => {
    socket.on("getChannels", () => {
      FetchChannels();
    });
  });

  const [collapsed, setCollapsed] = useState(true);
  const store = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const open = () => setIsOpen(true);
  const openSubMenu = () => setIsOpenSubMenu(!isOpenSubMenu);
  const close = () => setIsOpen(false);
  const channels = store.channel && store.channel.channels;
  const userId = store.auth.user._id;
  const toggle = () => {
    setCollapsed(!collapsed);
    setIsOpenSubMenu(false);
  };
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="z">
          <div className="logo">
            <div className="left" onClick={openSubMenu}>
              <label>
                CodersX-K1
                <DownOutlined />
              </label>
              <p id="username">{store.auth.user.fullname}</p>
            </div>
            <div className="right" onClick={open}>
              <FormOutlined style={{ color: "black" }} />
            </div>
          </div>
        </div>
        <MenuOption
          istoggle={toggle}
          isOpen={isOpenSubMenu}
          open={openSubMenu}
          user={store.auth.user}
        />
        <ModalAddChannel isOpen={isOpen} open={open} close={close} />
        <Menu
          className="menu-left"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
        >
          <Menu.Item key="a" icon={<MenuOutlined />}>
            All unreads
          </Menu.Item>
          <Menu.Item key="b" icon={<MessageOutlined />}>
            Threads
          </Menu.Item>
          <Menu.Item key="c" icon={<SnippetsOutlined />}>
            Drafts
          </Menu.Item>
          <Menu.Item key="d" icon={<SaveOutlined />}>
            Save Items
          </Menu.Item>
          <Menu.Item className="b-menu" key="e" icon={<FileZipOutlined />}>
            Files
          </Menu.Item>
          <SubMenu key="sub1" icon={<CommentOutlined />} title="Channels">
            {channels.map((item, index) => (
              <Menu.Item key={index}>
                <ModalJoinChannel
                  member={item.member}
                  path={`/channel/${item._id}`}
                  channelId={item._id}
                  channel={item.name}
                  userId={userId}
                >
                  {item.name}
                </ModalJoinChannel>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Message />
      <Sider
        className="sider-right"
        style={{
          overflow: "auto",
          height: "100vh",
        }}
        theme="light"
        trigger={null}
        collapsible
        collapsedWidth={0}
        collapsed={collapsed}
      >
        <div className="logo1">
          <p>Profile</p>
          <div onClick={toggle} className="close">
            <CloseOutlined />
          </div>
        </div>
        <div className="profile">
          <Avatar shape="square" size={150} icon={<UserOutlined />} />
          <div className="t-profile">
            <p className="fullname">{store.auth.user.fullname}</p>
            <a href="!#">Add a title</a>
          </div>
          <div className="p-action">
            <div className="icon-item status">
              <SmileOutlined style={{ color: "black" }} />
            </div>
            <div className="icon-item edit">
              <EditOutlined style={{ color: "black" }} />
            </div>
            <div className="icon-item more">
              <EllipsisOutlined style={{ color: "black" }} />
            </div>
          </div>
          <div className="info">
            <ul>
              <li>
                <div>
                  <p>Display Name</p>
                  <p>{store.auth.user.fullname}</p>
                </div>
                <div>
                  <p>UserName</p>
                  <p>{store.auth.user.username}</p>
                </div>
                <div>
                  <p>Phone</p>
                  <p>{store.auth.user.phone}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Sider>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchChannels: () => {
      dispatch(FetchChannels());
    },
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
