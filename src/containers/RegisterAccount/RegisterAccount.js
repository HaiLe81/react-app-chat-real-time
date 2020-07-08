import React, { useState } from "react";
import "./RegisterAccount.css";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "../../hooks";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { RegisterUser } from "../../redux/auth/auth-actions";

let a;
function RegisterAccount({ RegisterUser }) {
  const router = useRouter();
  a = router;
  const [isValidForm, setIsValidForm] = useState(false);
  const onChangeFields = (_, allFields) => {
    const isValid = allFields.every(
      (field) => field.errors.length === 0 && field.value
    );
    setIsValidForm(isValid);
  };

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    RegisterUser(values);
    setLoading(false);
  };

  return (
    <div className="register-account-page inherit d-flex-center ">
      <div className="card ">
        <div className="logo d-flex justify-center ">
          <UserOutlined />
        </div>
        <h2 className="title ">Register</h2>
        <div className="register-account-form">
          <Form
            onFieldsChange={onChangeFields}
            scrollToFirstError
            name="register-account"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "username is required" }]}
              hasFeedback
            >
              <Input className="form-input" placeholder="Enter username" />
            </Form.Item>

            <Form.Item
              name="fullname"
              hasFeedback
              rules={[{ required: true, message: "fullname is required" }]}
            >
              <Input className="form-input" placeholder="Enter fullname" />
            </Form.Item>

            <Form.Item
              name="email"
              hasFeedback
              rules={[
                { required: true, message: "Email is required", type: "email" },
              ]}
            >
              <Input className="form-input" placeholder="Emter your email" />
            </Form.Item>

            <Form.Item
              name="phone"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "phone is required",
                  min: 10,
                  max: 11
                },
              ]}
            >
              <Input
                className="form-input"
                placeholder="Emter your phone"
              />
            </Form.Item>

            <Form.Item
              name="password"
              hasFeedback
              rules={[{ required: true, message: "username is required" }]}
            >
              <Input.Password
                className="form-input"
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                disabled={!isValidForm}
                htmlType="submit"
                loading={loading}
                className="form-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="card">
        <span className="addition">
          You have an account? <Link to="/login">Login now!</Link>
        </span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    RegisterUser: (values) => {
      console.log("12", values);
      dispatch(RegisterUser(values))
        .then((res) => {
          console.log("res", res);
          message[res.status](res.message);
          a.push({
            pathname: "/login",
            state: {
              username: values.username,
              password: values.password,
            },
          });
        })
        .catch((err) => message[err.status](err.message));
    },
  };
};

export default connect(null, mapDispatchToProps)(RegisterAccount);
