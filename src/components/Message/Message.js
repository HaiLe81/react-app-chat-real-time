import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import "./Message.css";
import {
  TeamOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "../../hooks";
import { SendMessage, GetMessages } from "../../redux/message/messag-actions";
import { GetChannelById } from "../../redux/channel/channel-actions";
import { Layout, Input, Row, Col, Form, message } from "antd";
import MessageItem from "./MessageItem/MessageItem";
import { axios, globals } from "../../configs";
import { getCookie } from "../../redux/cookie/cookie-service";
import socket from "../../socket/index";
import ScrollableFeed from "react-scrollable-feed";

const { Header, Content, Footer } = Layout;
function Message({ SendMessage, GetMessages, GetChannelById }) {
  const textInput = React.createRef();
  useEffect(() => {
    textInput.current.focus();
  }, [textInput]);
  const router = useRouter();
  const store = useSelector((state) => state);
  const [form] = Form.useForm();
  const [messageList, setMessageList] = useState(null);
  const channelId = router.state && router.state.channelId;
  useEffect(() => {
    const token = getCookie(globals.env.COOKIE_KEY);
    if (!token) return;
    axios.setAuthorization(token);
  }, []);

  useEffect(() => {
    channelId && GetMessages(channelId);
    socket.on("getMessages", (data) => {
      GetMessages(data);
    });
  }, [GetMessages, channelId]);

  useEffect(() => {
    socket.on("getMembersChannel", (data) => {
      GetChannelById(data);
    });
  }, [GetChannelById]);

  useEffect(() => {
    let messages = store.message.messages;
    setMessageList(messages);
  }, [store.message.messages]);

  const member = store.channel.channel && store.channel.channel.member.length;

  const onSubmit = (values) => {
    let channel = router.params.channelId;
    let author = store.auth.user._id;
    SendMessage(channel, author, values.message);
    form.resetFields();
  };
  return (
    <Layout className="site-layout mes" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <Row>
          <Col className="col-1" span={22}>
            <div className="wrapper">
              <div className="name-channel">
                {router.state && router.state.channel}
              </div>
              <div className="users">
                <TeamOutlined />
                {member}
              </div>
            </div>
          </Col>
          <Col span={2}>
            <ExclamationCircleOutlined />
          </Col>
        </Row>
      </Header>
      <Content
        className="wr-message"
        style={{
          overflow: "initial",
        }}
      >
        <div className="site-layout-background b-content">
          <ScrollableFeed forceScroll={true}>
            {messageList &&
              messageList.map((item, index) => (
                <MessageItem key={index} item={item} />
              ))}
          </ScrollableFeed>
        </div>
      </Content>
      <Footer>
        <div className="wrapper-input">
          <Form form={form} onFinish={onSubmit}>
            <Form.Item name="message">
              <Input
                className="input"
                placeholder="Enter Message..."
                ref={textInput}
                suffix={<SendOutlined onClick={onSubmit} disabled={true} />}
              />
            </Form.Item>
          </Form>
        </div>
      </Footer>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    SendMessage: (channel, author, mes) => {
      dispatch(SendMessage(channel, author, mes))
        .then((res) => {
          socket.emit("sendMessage", channel);
          message[res.status](res.message);
        })
        .catch((err) => {
          message[err.status](err.message);
        });
    },
    GetMessages: (channelId) => {
      dispatch(GetMessages(channelId));
    },
    GetChannelById: (channelId) => {
      dispatch(GetChannelById(channelId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Message);