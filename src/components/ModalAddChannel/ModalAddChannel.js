import React from "react";
import "./ModalAddChannel.css";
import "antd/dist/antd.css";
import { connect, useSelector } from "react-redux";
import { Modal, Input, Form, Button, message } from "antd";
import { AddChannel } from "../../redux/channel/channel-actions";
import socket from "../../socket/index";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

const ModalAddChannel = ({ close, isOpen, AddChannel }) => {
  const selector = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const onFinish = ({ name }) => {
    let author = selector.user._id;
    AddChannel(name, author);
    form.resetFields();
    close();
  };
  const onFinishFailed = () => {
    console.log("Clicked");
  };
  return (
    <Modal
      title="Add new Channel"
      visible={isOpen}
      footer={null}
      onCancel={close}
    >
      <Form
        {...layout}
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input room name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddChannel: (name, author) => {
      dispatch(AddChannel(name, author))
        .then((res) => {
          socket.emit("addChannel");
          message[res.status](res.message);
        })
        .catch((err) => {
          message[err.status](err.message);
        });
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalAddChannel);
