import React, { useState } from "react";
import "./HomePage.css";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { Layout, Menu, Input, Row, Col, Avatar } from "antd";
import {
  TeamOutlined,
  SendOutlined,
  FormOutlined,
  MenuOutlined,
  MessageOutlined,
  SnippetsOutlined,
  SaveOutlined,
  FileZipOutlined,
  CommentOutlined,
  DownOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
  EditOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { ModalAddChannel, MenuOption } from "../../components";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const store = useSelector((state) => state);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const open = () => setIsOpen(true);
  const openSubMenu = () => setIsOpenSubMenu(!isOpenSubMenu);
  const close = () => setIsOpen(false);

  console.log("store", store);

  const onSubmit = (e) => {
    console.log("values", e.target.value);
  };
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
              <p id="username">HaiLe</p>
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
        />
        <ModalAddChannel isOpen={isOpen} open={open} close={close} />
        <Menu
          className="menu-left"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
        >
          <Menu.Item key="1" icon={<MenuOutlined />}>
            All unreads
          </Menu.Item>
          <Menu.Item key="2" icon={<MessageOutlined />}>
            Threads
          </Menu.Item>
          <Menu.Item key="3" icon={<SnippetsOutlined />}>
            Drafts
          </Menu.Item>
          <Menu.Item key="4" icon={<SaveOutlined />}>
            Save Items
          </Menu.Item>
          <Menu.Item className="b-menu" key="6" icon={<FileZipOutlined />}>
            Files
          </Menu.Item>
          <SubMenu key="sub1" icon={<CommentOutlined />} title="Channels">
            <Menu.Item key="7"># JavaScript</Menu.Item>
            <Menu.Item key="8"># HTML/CSS</Menu.Item>
            <Menu.Item key="9"># Job</Menu.Item>
            <Menu.Item key="10"># General</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col className="col-1" span={22}>
              <div className="wrapper">
                <div className="name-channel">#JavaScript</div>
                <div className="users">
                  <TeamOutlined />
                  7,979
                </div>
              </div>
            </Col>
            <Col span={2}>
              <ExclamationCircleOutlined />
            </Col>
          </Row>
        </Header>
        <Content style={{ overflow: "initial" }}>
          <div className="site-layout-background b-content">Really</div>
        </Content>
        <Footer>
          <div className="wrapper-input">
            <Input
              className="input"
              onPressEnter={(e) => onSubmit(e)}
              placeholder="Basic usage"
              suffix={<SendOutlined disabled={true} />}
            />
          </div>
        </Footer>
      </Layout>
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
            <p className="fullname">Hai Le</p>
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
                  <p>Hai Le</p>
                </div>
                <div>
                  <p>Display Name</p>
                  <p>Hai Le</p>
                </div>
                <div>
                  <p>Display Name</p>
                  <p>Hai Le</p>
                </div>
                <div>
                  <p>Display Name</p>
                  <p>Hai Le</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Sider>
    </Layout>
  );
}

export default HomePage;
