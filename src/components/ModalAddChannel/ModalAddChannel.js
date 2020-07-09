import React from "react";
import "./ModalAddChannel.css";
import "antd/dist/antd.css";
import { Modal, Input, Form, Button } from "antd";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};
const onFinish = () => {
  console.log("Clicked");
};
const onFinishFailed = () => {
  console.log("Clicked");
};

const ModalAddChannel = ({ close, isOpen }) => {
  return (
    <Modal title="Add new Channel" visible={isOpen} footer={null} onCancel={close}>
      <Form
        {...layout}
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

export default ModalAddChannel;
