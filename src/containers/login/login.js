import React, { useState, useMemo } from "react";
import "./login.css";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "../../hooks";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { LoginUsers } from "../../redux/auth/auth-actions";

let a;
function Login({ LoginUsers }) {
  const router = useRouter();
  a= router;
  const [isValidForm, setIsValidForm] = useState(false);
  const onChangeFields = (_, allFields) => {
    const isValid = allFields.every(
      (field) => field.errors.length === 0 && field.value
    );
    setIsValidForm(isValid);
  };

  const [loading, setLoading] = useState(false);
  const initialValues = useMemo(() => {
    const { username = "", password = "" } = router.state || {};
    if (username) setIsValidForm(true);
    return { username, password };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    LoginUsers(values);
    setLoading(false);
  };

  return (
    <div className="login-page inherit d-flex-center ">
      <div className="card ">
        <div className="logo d-flex justify-center ">
          <UserOutlined />
        </div>
        <h2 className="title ">Login</h2>
        <div className="login-form">
          <Form
            initialValues={initialValues}
            onFieldsChange={onChangeFields}
            scrollToFirstError
            name="login"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "username is required" }]}
              hasFeedback
            >
              <Input className="form-input" placeholder="username" />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[{ required: true, message: "username is required" }]}
            >
              <Input.Password className="form-input" placeholder="password" />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={!isValidForm}
                htmlType="submit"
                loading={loading}
                className="form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="card">
        <span className="addition">
          Don't have an account? <Link to="/register">Register now!</Link>
        </span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    LoginUsers: (values) => {
      dispatch(LoginUsers(values))
        .then((res) => {
          const { from = "/" } = a.state || {};
          message[res.status](res.message);
          a.replace(from)
        })
        .catch((err) => message[err.status](err.message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
